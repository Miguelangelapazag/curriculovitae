import type { ReactNode } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

type DocumentosProps = {
  category: string
  title: string
  author: string
  institution?: string
  onViewFile?: () => void
  onApprove?: () => void
  icon?: ReactNode
  style?: StyleProp<ViewStyle>
}

export default function Documentos({
  category,
  title,
  author,
  institution,
  onViewFile,
  onApprove,
  icon,
  style,
}: DocumentosProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.category} numberOfLines={1}>
        {category}
      </Text>

      <View style={styles.content}>
        <View style={styles.documentIcon}>
          {icon ?? <Text style={styles.fileGlyph}>▯</Text>}
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {author}
          </Text>
          {institution ? (
            <Text style={styles.institution} numberOfLines={2}>
              {institution}
            </Text>
          ) : null}
        </View>

        {onViewFile ? (
          <Pressable
            accessibilityRole="button"
            onPress={onViewFile}
            style={({ pressed }) => [
              styles.viewButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.viewButtonText} numberOfLines={1}>
              Ver archivo
            </Text>
          </Pressable>
        ) : null}

        {onApprove ? (
          <Pressable
            accessibilityRole="button"
            onPress={onApprove}
            style={({ pressed }) => [
              styles.approveButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.approveButtonText}>Aprobar</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 11,
    paddingVertical: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  category: {
    marginLeft: 49,
    marginBottom: 7,
    color: '#101828',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#EEF2FF',
    borderRadius: 11,
  },
  fileGlyph: {
    color: '#315EFB',
    fontSize: 23,
    lineHeight: 27,
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },
  author: {
    marginTop: 4,
    color: '#62718A',
    fontSize: 10,
    lineHeight: 14,
  },
  institution: {
    marginTop: 2,
    color: '#8490A3',
    fontSize: 9,
    lineHeight: 12,
  },
  viewButton: {
    flexShrink: 0,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  viewButtonText: {
    color: '#2457F5',
    fontSize: 12,
    fontWeight: '500',
  },
  approveButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    paddingHorizontal: 17,
    backgroundColor: '#315EFB',
    borderRadius: 13,
    shadowColor: '#315EFB',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 4,
  },
  approveButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
})