import PerfilCard from "@/components/PerfilCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Perfiles() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfiles de candidatos</Text>

      <ScrollView>
        <PerfilCard />

        <PerfilCard />

        <PerfilCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
});
