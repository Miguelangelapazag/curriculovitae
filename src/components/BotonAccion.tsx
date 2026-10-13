import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function BotonAccion({ texto }: { texto: string }) {
  return (
    <TouchableOpacity style={styles.btn}>
      <Text>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 8,
    borderRadius: 8,
    width: 110,
    alignItems: "center",
  },
});
