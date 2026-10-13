import { PublicationsList } from "@/components/organisms/PublicationsList";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const publications = [
  {
    id: 1,
    title: "Product Designer Senior",
    location: "La Paz",
    modality: "Híbrido",
    status: "publicada",
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "Santa Cruz",
    modality: "Remoto",
    status: "publicada",
  },
  {
    id: 3,
    title: "Analista BI",
    location: "Cochabamba",
    modality: "Híbrido",
    status: "publicada",
  },
] as const;

export default function Index() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>ATRACCIÓN DE TALENTO</Text>
      <Text style={styles.title}>Vacantes</Text>
      <Text style={styles.subtitle}>
        Publica oportunidades y gestiona su alcance.
      </Text>

      <View style={{ height: 24 }} />

      <PublicationsList
        publications={[...publications]}
        onEdit={(p) => console.log("Editar", p.id)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FC" },
  content: { padding: 20, paddingTop: 60 },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#3B5BFF",
  },
  title: { fontSize: 32, color: "#0F1230", marginTop: 4 },
  subtitle: { fontSize: 15, color: "#6B7280", marginTop: 4 },
});
