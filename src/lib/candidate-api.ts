export type CandidateProfile = {
  id: string
  full_name: string
  email: string
  phone: string | null
  profile_photo: string | null
  role: 'candidate'
  account_status: string | null
  email_verified_at: string | null
  last_login_at: string | null
  created_at: string | null
  updated_at: string | null
}

function getApiUrl() {
  const url = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '')

  if (!url) {
    throw new Error(
      'Configura EXPO_PUBLIC_API_URL en el archivo .env de la raíz.',
    )
  }

  return url
}

async function getErrorMessage(response: Response) {
  const payload: unknown = await response.json().catch(() => null)

  if (
    payload &&
    typeof payload === 'object' &&
    'error' in payload &&
    typeof payload.error === 'string'
  ) {
    return payload.error
  }

  return `La solicitud falló (${response.status}).`
}

function isCandidateProfile(value: unknown): value is CandidateProfile {
  if (!value || typeof value !== 'object') return false

  const profile = value as Record<string, unknown>
  const nullableStrings = [
    'phone',
    'profile_photo',
    'account_status',
    'email_verified_at',
    'last_login_at',
    'created_at',
    'updated_at',
  ]

  return (
    typeof profile.id === 'string' &&
    typeof profile.full_name === 'string' &&
    typeof profile.email === 'string' &&
    profile.role === 'candidate' &&
    nullableStrings.every(
      (field) =>
        profile[field] === null || typeof profile[field] === 'string',
    )
  )
}

export async function getCandidateProfile(accessToken: string) {
  const response = await fetch(`${getApiUrl()}/api/candidates/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  const payload: unknown = await response.json()
  const profile =
    payload &&
    typeof payload === 'object' &&
    'profile' in payload
      ? payload.profile
      : null

  if (!isCandidateProfile(profile)) {
    throw new Error('La API devolvió un perfil de candidato con formato inválido.')
  }

  return profile
}

export async function updateCandidatePassword(
  accessToken: string,
  currentPassword: string,
  newPassword: string,
) {
  const response = await fetch(
    `${getApiUrl()}/api/candidates/me/password`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    },
  )

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  return (await response.json()) as { message: string }
}
