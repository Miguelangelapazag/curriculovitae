import { useState, type ReactNode } from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

type AppShellProps = {
  activeRoute: 'supervision' | 'vacantes' | 'perfil'
  children: ReactNode
}

export default function AppShell({ activeRoute, children }: AppShellProps) {
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir menú de navegación"
          onPress={() => setMenuVisible(true)}
          style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
        >
          <Text style={styles.menuGlyph}>☰</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cambiar perfil"
          onPress={() => Alert.alert('Perfil', 'Administración')}
          style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}
        >
          <Text style={styles.profileLabel} numberOfLines={1}>
            Vista administración
          </Text>
          <Text style={styles.chevron}>⌄</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {menuVisible ? (
        <View style={styles.overlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cerrar menú"
            onPress={() => setMenuVisible(false)}
            style={styles.backdrop}
          />
          <View style={styles.drawer}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <View style={styles.logoDots}>
                  <View style={styles.logoDot} />
                  <View style={styles.logoDot} />
                  <View style={styles.logoDot} />
                </View>
              </View>
              <Text style={styles.brandName}>
                TALENTO<Text style={styles.brandAccent}>NOVA</Text>
              </Text>
            </View>

            <View style={styles.navigation}>
              <DrawerItem
                label="Resumen"
                icon="⌂"
                active={activeRoute === 'supervision'}
                onPress={() => {
                  setMenuVisible(false)
                  router.push('/')
                }}
              />
              <DrawerItem
                label="Supervisión"
                icon="☼"
                active={activeRoute === 'supervision'}
                onPress={() => {
                  setMenuVisible(false)
                  router.push('/')
                }}
              />
              <DrawerItem
                label="Usuarios"
                icon="♙"
                onPress={() => {
                  setMenuVisible(false)
                  Alert.alert('Usuarios', 'Esta sección estará disponible pronto.')
                }}
              />
              <DrawerItem
                label="Vacantes"
                icon="▱"
                active={activeRoute === 'vacantes'}
                onPress={() => {
                  setMenuVisible(false)
                  router.push('/explore')
                }}
              />
              <DrawerItem
                label="Perfil candidato"
                icon="♙"
                active={activeRoute === 'perfil'}
                onPress={() => {
                  setMenuVisible(false)
                  router.push('/perfil')
                }}
              />
            </View>

            <View style={styles.divider} />

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setMenuVisible(false)
                Alert.alert('Administración', 'Supervisión')
              }}
              style={({ pressed }) => [styles.account, pressed && styles.pressed]}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>CM</Text>
              </View>
              <View style={styles.accountCopy}>
                <Text style={styles.accountName}>Administración</Text>
                <Text style={styles.accountRole}>Supervisión</Text>
              </View>
              <Text style={styles.accountChevron}>›</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

type DrawerItemProps = {
  label: string
  icon: string
  active?: boolean
  onPress: () => void
}

function DrawerItem({ label, icon, active = false, onPress }: DrawerItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.drawerItem,
        active && styles.drawerItemActive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.drawerIcon, active && styles.drawerIconActive]}>
        {icon}
      </Text>
      <Text style={[styles.drawerLabel, active && styles.drawerLabelActive]}>
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  topBar: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 9,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6ECF5',
  },
  menuButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E3EAF4',
    borderRadius: 13,
  },
  menuGlyph: {
    color: '#536680',
    fontSize: 20,
  },
  profileButton: {
    width: '72%',
    maxWidth: 250,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E3EAF4',
    borderRadius: 14,
  },
  profileLabel: {
    flex: 1,
    color: '#17243B',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  chevron: {
    marginLeft: 10,
    color: '#17243B',
    fontSize: 19,
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 26,
    paddingBottom: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    zIndex: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(13, 23, 42, 0.52)',
  },
  drawer: {
    width: '70%',
    maxWidth: 320,
    minWidth: 260,
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: '#101B33',
  },
  brand: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  logo: {
    width: 43,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
  },
  logoDots: {
    width: 17,
    height: 17,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  logoDot: {
    width: 5,
    height: 5,
    backgroundColor: '#00BFB5',
    borderRadius: 3,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  brandAccent: {
    color: '#00C4B8',
  },
  navigation: {
    gap: 3,
  },
  drawerItem: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  drawerItemActive: {
    backgroundColor: '#202D47',
  },
  drawerIcon: {
    width: 23,
    color: '#93A2B8',
    fontSize: 19,
  },
  drawerIconActive: {
    color: '#00C4B8',
  },
  drawerLabel: {
    marginLeft: 8,
    color: '#9AA8BC',
    fontSize: 13,
    fontWeight: '500',
  },
  drawerLabelActive: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    marginTop: 8,
    marginBottom: 14,
    backgroundColor: '#26334B',
  },
  account: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  avatar: {
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#304460',
    borderRadius: 12,
  },
  avatarText: {
    color: '#DDE8F7',
    fontSize: 11,
    fontWeight: '700',
  },
  accountCopy: {
    flex: 1,
    marginLeft: 10,
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  accountRole: {
    marginTop: 2,
    color: '#9AA8BC',
    fontSize: 10,
  },
  accountChevron: {
    color: '#91A0B6',
    fontSize: 24,
  },
  pressed: {
    opacity: 0.72,
  },
})
