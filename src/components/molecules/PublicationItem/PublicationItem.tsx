import { Pressable, StyleSheet, Text, View } from "react-native";

export type PublicationStatus = "publicada" | "borrador" | "cerrada";

export interface PublicationItemProps {
  title: string;
  location: string;
  modality: string; // Híbrido, Remoto, Presencial
  status?: PublicationStatus;
  showDivider?: boolean;
  onEdit?: () => void;
}

const STATUS = {
  publicada: { label: "Publicada", bg: "#E3F6EE", color: "#0F8A5F" },
  borrador: { label: "Borrador", bg: "#FFF4D6", color: "#A16207" },
  cerrada: { label: "Cerrada", bg: "#ECEEF3", color: "#6B7280" },
} as const;

export const PublicationItem = ({
  title,
  location,
  modality,
  status = "publicada",
  showDivider = false,
  onEdit,
}: PublicationItemProps) => {
  const s = STATUS[status];

  return (
    <View style={[styles.container, showDivider && styles.divider]}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{title.charAt(0).toUpperCase()}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.meta}>
            {location} · {modality}
          </Text>
        </View>

        <View style={[styles.badge, { backgroundColor: s.bg }]}>
          <Text style={[styles.badgeText, { color: s.color }]}>{s.label}</Text>
        </View>
      </View>

      <Pressable onPress={onEdit} hitSlop={8} style={styles.editButton}>
        <Text style={styles.editText}>Editar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 16 },
  divider: { borderTopWidth: 1, borderTopColor: "#E5E7F0" },
  row: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#3B5BFF", fontWeight: "600", fontSize: 16 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: "600", color: "#0F1230" },
  meta: { marginTop: 2, fontSize: 11, color: "#6B7280" },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  editButton: { marginLeft: 60, marginTop: 8, alignSelf: "flex-start" },
  editText: { color: "#3B5BFF", fontWeight: "600", fontSize: 15 },
});
