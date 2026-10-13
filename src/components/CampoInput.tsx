import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CampoInput({
  titulo,
  valorFondo,
}: {
  titulo: String;
  valorFondo: String;
}) {
  return (
    <View style={styles.contenido}>
      <Text>{`${titulo}`}</Text>
      <TextInput style={styles.input} placeholder={`${valorFondo}`}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    color: "#727272",
    fontFamily: "arial",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#727272",
  },

  titulo: {},
  contenido: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    padding: 15,
  },
});
