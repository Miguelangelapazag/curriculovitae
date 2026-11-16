const express = require('express')
const { createClient } = require('@supabase/supabase-js')

const PORT = Number(process.env.PORT || 3000)
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map((origin) => origin.trim())

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !SUPABASE_SECRET_KEY) {
  throw new Error(
    'Configura SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY y SUPABASE_SECRET_KEY en server/.env.',
  )
}

if (SUPABASE_PUBLISHABLE_KEY.startsWith('sb_secret_')) {
  throw new Error(
    'SUPABASE_PUBLISHABLE_KEY debe ser una clave publishable; nunca uses una clave secreta como clave pública.',
  )
}

if (
  !SUPABASE_PUBLISHABLE_KEY.startsWith('sb_publishable_') ||
  !SUPABASE_SECRET_KEY.startsWith('sb_secret_')
) {
  throw new Error(
    'Usa una clave sb_publishable_ para SUPABASE_PUBLISHABLE_KEY y una clave sb_secret_ para SUPABASE_SECRET_KEY.',
  )
}

const authOptions = {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
  },
}

const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SECRET_KEY,
  authOptions,
)

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '16kb' }))

app.use((req, res, next) => {
  const origin = req.get('origin')
  const allowAllOrigins = CORS_ORIGINS.includes('*')

  if (
    origin &&
    !allowAllOrigins &&
    !CORS_ORIGINS.includes(origin)
  ) {
    return res.status(403).json({ error: 'Origen no permitido.' })
  }

  res.setHeader(
    'Access-Control-Allow-Origin',
    allowAllOrigins ? '*' : origin || CORS_ORIGINS[0],
  )
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }

  next()
})

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}

function logSupabaseFailure(operation, error) {
  console.error(`[api] ${operation} failed`, {
    code: typeof error?.code === 'string' ? error.code : undefined,
  })
}

const requireCandidate = asyncHandler(async (req, res, next) => {
  const authorization = req.get('authorization') || ''
  const match = authorization.match(/^Bearer\s+(\S+)$/i)

  if (!match) {
    return res.status(401).json({ error: 'Se requiere una sesión válida.' })
  }

  const authClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    authOptions,
  )
  const { data, error } = await authClient.auth.getUser(match[1])

  if (error || !data.user) {
    return res.status(401).json({ error: 'La sesión es inválida o venció.' })
  }

  req.authUser = data.user
  next()
})

async function findCandidate(authUserId) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select(
      'id, full_name, email, phone, profile_photo, role, account_status, email_verified_at, last_login_at, created_at, updated_at',
    )
    .eq('auth_user_id', authUserId)
    .eq('role', 'candidate')
    .is('deleted_at', null)
    .maybeSingle()

  if (error) {
    logSupabaseFailure('candidate profile lookup', error)
    throw new ApiError(500, 'No fue posible obtener el perfil del candidato.')
  }

  return data
}

app.get(
  '/api/candidates/me',
  requireCandidate,
  asyncHandler(async (req, res) => {
    const profile = await findCandidate(req.authUser.id)

    if (!profile) {
      return res
        .status(404)
        .json({ error: 'No se encontró el perfil del candidato.' })
    }

    return res.json({ profile })
  }),
)

app.patch(
  '/api/candidates/me/password',
  requireCandidate,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body || {}

    if (
      typeof currentPassword !== 'string' ||
      typeof newPassword !== 'string' ||
      currentPassword.length === 0 ||
      newPassword.length < 8
    ) {
      return res.status(400).json({
        error:
          'Envía la contraseña actual y una nueva contraseña de al menos 8 caracteres.',
      })
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        error: 'La nueva contraseña debe ser diferente a la actual.',
      })
    }

    const profile = await findCandidate(req.authUser.id)

    if (!profile) {
      return res
        .status(404)
        .json({ error: 'No se encontró el perfil del candidato.' })
    }

    if (!req.authUser.email) {
      return res.status(400).json({
        error: 'La cuenta no tiene un correo para verificar la contraseña actual.',
      })
    }

    const passwordClient = createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      authOptions,
    )
    const { data, error } = await passwordClient.auth.signInWithPassword({
      email: req.authUser.email,
      password: currentPassword,
    })

    if (error || data.user?.id !== req.authUser.id || !data.session) {
      return res
        .status(401)
        .json({ error: 'La contraseña actual no es correcta.' })
    }

    const { error: updateError } = await passwordClient.auth.updateUser({
      password: newPassword,
    })

    if (updateError) {
      logSupabaseFailure('password update', updateError)
      return res.status(422).json({
        error:
          'No se pudo cambiar la contraseña. Verifica los requisitos configurados en Supabase.',
      })
    }

    return res.json({ message: 'Contraseña actualizada correctamente.' })
  }),
)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo JSON no es válido.' })
  }

  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ error: 'La solicitud excede el tamaño permitido.' })
  }

  console.error('[api] unexpected request failure', {
    name: typeof error?.name === 'string' ? error.name : 'Error',
  })
  return res.status(error instanceof ApiError ? error.status : 500).json({
    error:
      error instanceof ApiError
        ? error.message
        : 'Ocurrió un error interno. Inténtalo más tarde.',
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API disponible en el puerto ${PORT}.`)
})
