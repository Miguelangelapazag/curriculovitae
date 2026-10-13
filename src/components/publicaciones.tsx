import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

type PublicacionesProps = {
  title: string
  location: string
  status?: string
  iconLabel?: string
  editLabel?: string
  onEdit?: () => void
  style?: StyleProp<ViewStyle>
}

export default function Publicaciones({
  title,
  location,
  status = 'Publicada',
  iconLabel = 'P',
  editLabel = 'Editar',
  onEdit,
  style,
}: PublicacionesProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={styles.iconLabel} numberOfLines={1}>
            {iconLabel}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
        </View>

        {status ? (
          <View style={styles.status}>
            <Text style={styles.statusText} numberOfLines={1}>
              {status}
            </Text>
          </View>
        ) : null}
      </View>

      {onEdit ? (
        <Pressable
          accessibilityRole="button"
          onPress={onEdit}
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.editLabel}>{editLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: 13,
  },
  iconLabel: {
    color: '#315EFB',
    fontSize: 13,
    fontWeight: '700',
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  location: {
    marginTop: 5,
    color: '#78859A',
    fontSize: 10,
    lineHeight: 14,
  },
  status: {
    flexShrink: 0,
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#E4F7F1',
    borderRadius: 20,
  },
  statusText: {
    color: '#00876C',
    fontSize: 10,
    fontWeight: '600',
  },
  editButton: {
    alignSelf: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  editLabel: {
    color: '#315EFB',
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
})