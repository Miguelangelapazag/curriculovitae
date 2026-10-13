import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function CuentaPrueba({
  name,
  cuenta,
}: {
  name: String;
  cuenta: String;
}) {
  const flecha = ">";
  return (
    <View style={styles.todo}>
      <Image
        style={styles.imagen}
        source={require("@/assets/images/icono.png")}
      />
      <View style={styles.contTexto}>
        <Text style={styles.tNegro}>{name}</Text>
        <Text style={styles.tPlomo}>{cuenta}</Text>
      </View>
      <Text style={styles.icono}>{flecha}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  imagen: {
    width: 40,
    height: 40,
  },
  icono: {
    fontWeight: 700,
    fontSize: 20,
  },
  todo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    padding: 5,
    borderWidth: 1.5,
    borderColor: "#737373",
    borderRadius: 20,
  },
  contTexto: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  tNegro: {
    color: "#111",
    fontSize: 13,
  },
  tPlomo: {
    color: "#737373",
    fontSize: 13,
  },
});
