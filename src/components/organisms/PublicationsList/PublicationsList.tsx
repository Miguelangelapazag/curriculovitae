import { StyleSheet, Text, View } from "react-native";
import type { PublicationItemProps } from "../../molecules/PublicationItem";
import { PublicationItem } from "../../molecules/PublicationItem";

export interface Publication extends Omit<
  PublicationItemProps,
  "onEdit" | "showDivider"
> {
  id: string | number;
}

export interface PublicationsListProps {
  publications: Publication[];
  onEdit?: (publication: Publication) => void;
}

export const PublicationsList = ({
  publications,
  onEdit,
}: PublicationsListProps) => (
  <View style={styles.card}>
    <Text style={styles.eyebrow}>PORTAFOLIO</Text>
    <Text style={styles.title}>Mis publicaciones</Text>

    {publications.length === 0 ? (
      <Text style={styles.empty}>Aún no tienes vacantes publicadas.</Text>
    ) : (
      publications.map((p, index) => (
        <PublicationItem
          key={p.id}
          title={p.title}
          location={p.location}
          modality={p.modality}
          status={p.status}
          showDivider={index > 0}
          onEdit={() => onEdit?.(p)}
        />
      ))
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7F0",
    backgroundColor: "#FFFFFF",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#3B5BFF",
  },
  title: { marginTop: 4, marginBottom: 8, fontSize: 22, color: "#0F1230" },
  empty: { fontSize: 14, color: "#6B7280" },
});
