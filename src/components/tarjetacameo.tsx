import type { ReactNode } from 'react'
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

type TarjetaCameoProps = {
  title: string
  value: string | number
  icon: ReactNode
  trend?: string
  style?: StyleProp<ViewStyle>
}

export default function TarjetaCameo({
  title,
  value,
  icon,
  trend,
  style,
}: TarjetaCameoProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        </View>

        {trend ? (
          <Text style={styles.trend} numberOfLines={1}>
            {trend}
          </Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF4',
    borderRadius: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#EAF0FF',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexShrink: 1,
    minWidth: 0,
  },
  title: {
    color: '#69758A',
    fontSize: 11,
    lineHeight: 16,
  },
  value: {
    marginTop: 2,
    color: '#17243B',
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 26,
  },
  trend: {
    flexShrink: 0,
    marginLeft: 8,
    paddingBottom: 2,
    color: '#00A875',
    fontSize: 9,
    lineHeight: 13,
    textAlign: 'right',
  },
})
