import { StyleSheet, Text, View } from "react-native";

export default function HeaderLogin() {
  return (
    <View style={styles.conteiner}>
      <Text style={styles.tAzul}>BIENVENIDO DE NUEVO</Text>
      <Text style={styles.tNegro}>Ingresa a tu espacio</Text>
      <Text style={styles.tPlomo}>
        Accede con tus credenciales o usa una cuenta de prueba
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 15,
  },
  tAzul: {
    color: "#1010CC",
    fontWeight: 600,
  },
  tNegro: {
    color: "#111",
    fontSize: 27,
  },
  tPlomo: {
    color: "#737373",
    fontSize: 13,
  },
});
