import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { Session } from '@supabase/supabase-js'

import {
  getCandidateProfile,
  updateCandidatePassword,
  type CandidateProfile,
} from '@/lib/candidate-api'
import { getSupabaseClient } from '@/lib/supabase'

export default function CandidateProfileScreen() {
  const [authConfig] = useState(() => {
    try {
      return { client: getSupabaseClient(), error: '' }
    } catch (error) {
      return {
        client: null,
        error:
          error instanceof Error ? error.message : 'Falta configurar Supabase.',
      }
    }
  })
  const supabase = authConfig.client
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<CandidateProfile | null>(null)
  const [email, setEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [message, setMessage] = useState(authConfig.error)

  const loadProfile = useCallback(async (accessToken: string) => {
    setLoadingProfile(true)
    setMessage('')

    try {
      const candidate = await getCandidateProfile(accessToken)
      setProfile(candidate)
    } catch (error) {
      setProfile(null)
      setMessage(
        error instanceof Error ? error.message : 'No se pudo cargar el perfil.',
      )
    } finally {
      setLoadingProfile(false)
    }
  }, [])

  useEffect(() => {
    if (!supabase) return

    let active = true

    function applySession(nextSession: Session | null) {
      if (!active) return

      setSession(nextSession)
      if (nextSession) {
        void loadProfile(nextSession.access_token)
      } else {
        setProfile(null)
        setLoadingProfile(false)
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      applySession(nextSession)
    })

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        setMessage(error.message)
        return
      }
      applySession(data.session)
    }).catch((error: unknown) => {
      if (active) {
        setMessage(
          error instanceof Error
            ? error.message
            : 'No se pudo recuperar la sesión.',
        )
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [loadProfile, supabase])

  async function signIn() {
    if (!email.trim() || !loginPassword) {
      setMessage('Escribe tu correo y contraseña.')
      return
    }

    setBusy(true)
    setMessage('')

    try {
      if (!supabase) throw new Error(authConfig.error)
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: loginPassword,
      })

      if (error) throw error
      setLoginPassword('')
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'No se pudo iniciar sesión.',
      )
    } finally {
      setBusy(false)
    }
  }

  async function changePassword() {
    if (!session) return
    if (!currentPassword || newPassword.length < 8) {
      setMessage('Ingresa la contraseña actual y una nueva de al menos 8 caracteres.')
      return
    }

    setBusy(true)
    setMessage('')

    try {
      const result = await updateCandidatePassword(
        session.access_token,
        currentPassword,
        newPassword,
      )
      setCurrentPassword('')
      setNewPassword('')
      setMessage(result.message)
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'No se pudo cambiar la contraseña.',
      )
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    try {
      if (!supabase) throw new Error(authConfig.error)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setMessage('')
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'No se pudo cerrar la sesión.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.backLabel}>‹ Volver</Text>
        </Pressable>
        <Text style={styles.eyebrow}>CUENTA DE CANDIDATO</Text>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.subtitle}>
          Consulta tus datos y administra el acceso a tu cuenta.
        </Text>

        {message ? (
          <Text accessibilityRole="alert" style={styles.message}>
            {message}
          </Text>
        ) : null}

        {!session ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Iniciar sesión</Text>
            <TextInput
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Correo electrónico"
              placeholderTextColor="#8996A9"
              style={styles.input}
              value={email}
            />
            <TextInput
              autoComplete="current-password"
              onChangeText={setLoginPassword}
              placeholder="Contraseña"
              placeholderTextColor="#8996A9"
              secureTextEntry
              style={styles.input}
              value={loginPassword}
            />
            <PrimaryButton
              disabled={busy}
              label="Iniciar sesión"
              onPress={signIn}
            />
          </View>
        ) : loadingProfile ? (
          <View style={styles.card}>
            <ActivityIndicator color="#315EFB" />
            <Text style={styles.loadingText}>Cargando perfil…</Text>
          </View>
        ) : profile ? (
          <>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Datos del perfil</Text>
              <ProfileRow label="Nombre" value={profile.full_name} />
              <ProfileRow label="Correo" value={profile.email} />
              <ProfileRow label="Teléfono" value={profile.phone || 'Sin registrar'} />
              <ProfileRow label="Estado" value={profile.account_status || 'Sin estado'} />
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Cambiar contraseña</Text>
              <TextInput
                autoComplete="current-password"
                onChangeText={setCurrentPassword}
                placeholder="Contraseña actual"
                placeholderTextColor="#8996A9"
                secureTextEntry
                style={styles.input}
                value={currentPassword}
              />
              <TextInput
                autoComplete="new-password"
                onChangeText={setNewPassword}
                placeholder="Nueva contraseña (mín. 8 caracteres)"
                placeholderTextColor="#8996A9"
                secureTextEntry
                style={styles.input}
                value={newPassword}
              />
              <PrimaryButton
                disabled={busy}
                label="Actualizar contraseña"
                onPress={changePassword}
              />
            </View>

            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={signOut}
              style={({ pressed }) => [
                styles.signOutButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.signOutLabel}>Cerrar sesión</Text>
            </Pressable>
          </>
        ) : session ? (
          <View style={styles.card}>
            <Text style={styles.body}>
              La sesión está activa, pero no se pudo cargar un perfil de candidato.
              Verifica que `public.users.auth_user_id` esté vinculado a esta cuenta
              y que su rol sea `candidate`.
            </Text>
            <PrimaryButton
              disabled={busy}
              label="Volver a intentar"
              onPress={() => void loadProfile(session.access_token)}
            />
            <Pressable
              accessibilityRole="button"
              disabled={busy}
              onPress={signOut}
              style={styles.signOutButton}
            >
              <Text style={styles.signOutLabel}>Cerrar sesión</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  )
}

function PrimaryButton({
  label,
  disabled,
  onPress,
}: {
  label: string
  disabled: boolean
  onPress: () => void
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        (pressed || disabled) && styles.pressed,
      ]}
    >
      {disabled ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.primaryLabel}>{label}</Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  content: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    paddingVertical: 6,
  },
  backLabel: {
    color: '#315EFB',
    fontSize: 14,
    fontWeight: '600',
  },
  eyebrow: {
    color: '#315EFB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
  },
  title: {
    marginTop: 6,
    color: '#17243B',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: '#68778D',
    fontSize: 13,
    lineHeight: 19,
  },
  message: {
    marginBottom: 14,
    padding: 12,
    color: '#8C3D19',
    backgroundColor: '#FFF3E8',
    borderRadius: 10,
    fontSize: 13,
    lineHeight: 19,
  },
  card: {
    marginBottom: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF4',
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: 14,
    color: '#17243B',
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    minHeight: 48,
    marginBottom: 11,
    paddingHorizontal: 13,
    color: '#17243B',
    backgroundColor: '#F8FAFD',
    borderWidth: 1,
    borderColor: '#E1E8F2',
    borderRadius: 11,
    fontSize: 14,
  },
  primaryButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
    backgroundColor: '#315EFB',
    borderRadius: 12,
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  profileRow: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EBF4',
  },
  rowLabel: {
    color: '#718098',
    fontSize: 11,
  },
  rowValue: {
    marginTop: 4,
    color: '#17243B',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 10,
    color: '#68778D',
    fontSize: 13,
    textAlign: 'center',
  },
  body: {
    marginBottom: 12,
    color: '#68778D',
    fontSize: 13,
    lineHeight: 19,
  },
  signOutButton: {
    alignSelf: 'center',
    marginBottom: 18,
    padding: 12,
  },
  signOutLabel: {
    color: '#B42318',
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.72,
  },
})
