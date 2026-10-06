import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";

export default function TabTwoScreen() {
  return <ThemedText style={styles.titulo}>ESTE ES LA PAGINA 2</ThemedText>;
}

const styles = StyleSheet.create({
  titulo: {
    color: "green",
  },
});
