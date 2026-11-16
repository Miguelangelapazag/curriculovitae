import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { authStorage } from './auth-storage'

let client: SupabaseClient | undefined

export function getSupabaseClient() {
  if (client) return client

  const url = process.env.EXPO_PUBLIC_SUPABASE_URL
  const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !publishableKey) {
    throw new Error(
      'Configura EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY en el archivo .env de la raíz.',
    )
  }

  if (publishableKey.startsWith('sb_secret_')) {
    throw new Error(
      'La app solo puede usar la clave publishable; la clave secreta debe permanecer en el servidor.',
    )
  }

  client = createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storage: authStorage,
    },
  })

  return client
}
