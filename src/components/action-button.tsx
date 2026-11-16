import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

type ActionButtonProps = {
  label: string
  onPress: () => void
  icon?: string
  variant?: 'primary' | 'secondary'
  style?: StyleProp<ViewStyle>
}

export default function ActionButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  style,
}: ActionButtonProps) {
  const secondary = variant === 'secondary'

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary ? styles.secondary : styles.primary,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon ? (
        <Text style={[styles.icon, secondary && styles.secondaryText]}>{icon}</Text>
      ) : null}
      <Text style={[styles.label, secondary && styles.secondaryText]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 13,
  },
  primary: {
    backgroundColor: '#315EFB',
    shadowColor: '#315EFB',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E3EAF4',
    shadowColor: '#14213A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 9,
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 24,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryText: {
    color: '#14213A',
  },
  pressed: {
    opacity: 0.75,
  },
})
