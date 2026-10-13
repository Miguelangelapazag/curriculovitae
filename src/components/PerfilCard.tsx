import { Image, StyleSheet, Text, View } from "react-native";
import BotonAccion from "./BotonAccion";
import TagHabilidad from "./TagHabilidad";

export default function PerfilCard() {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/1.jpg",
          }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.nombre}>Rodrigo Salvatierra</Text>

          <Text>Ingeniero de Software</Text>

          <Text>Santa Cruz - Bolivia</Text>
        </View>
      </View>

      <View style={styles.tags}>
        <TagHabilidad texto="React" />

        <TagHabilidad texto="Node" />

        <TagHabilidad texto="AWS" />
      </View>

      <View style={styles.botones}>
        <BotonAccion texto="Ver perfil" />

        <BotonAccion texto="Contactar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  nombre: {
    fontWeight: "bold",
    fontSize: 16,
  },

  tags: {
    flexDirection: "row",
    marginTop: 10,
  },

  botones: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
});
