import { Pressable, StyleSheet, Text } from "react-native";

export default function BotonLogin() {
  return (
    <Pressable style={styles.boton}>
      <Text style={styles.texto}>Ingresar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: "#1010CC",
    padding: 10,
    borderRadius: 20,
    margin: 15,
  },
  texto: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
