import { Children, type ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

type ContenedorProps = {
  eyebrow?: string
  title: string
  badge?: string
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

export default function Contenedor({
  eyebrow = 'PORTAFOLIO',
  title,
  badge,
  children,
  style,
}: ContenedorProps) {
  const items = Children.toArray(children)

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.items}>
        {items.map((item, index) => (
          <View key={index}>
            {index > 0 ? <View style={styles.divider} /> : null}
            {item}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 21,
    paddingTop: 22,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF4',
    borderRadius: 18,
  },
  eyebrow: {
    color: '#315EFB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    lineHeight: 16,
  },
  title: {
    flex: 1,
    marginTop: 6,
    marginBottom: 0,
    color: '#17243B',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFF3DC',
    borderRadius: 14,
  },
  badgeText: {
    color: '#A85A00',
    fontSize: 10,
    fontWeight: '600',
  },
  items: {
    width: '100%',
  },
  divider: {
    height: 1,
    marginVertical: 4,
    backgroundColor: '#E3EAF4',
  },
})