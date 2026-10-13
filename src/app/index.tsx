import { Alert, StyleSheet, Text, View } from "react-native";

import Documentos from "@/components/documentos";
import Publicaciones from "@/components/publicaciones";
import TarjetaCameo from "@/components/tarjetacameo";
import { ThemedText } from "@/components/themed-text";

// function getDevMenuHint() {
//   if (Platform.OS === "web") {
//     return <ThemedText type="small">use browser devtools</ThemedText>;
//   }
//   if (Device.isDevice) {
//     return (
//       <ThemedText type="small">
//         shake device or press <ThemedText type="code">m</ThemedText> in terminal
//       </ThemedText>
//     );
//   }
//   const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
//   return (
//     <ThemedText type="small">
//       press <ThemedText type="code">{shortcut}</ThemedText>
//     </ThemedText>
//   );
// }

export default function HomeScreen() {
  return (
    <View style={styles.contenedor}>
      <ThemedText style={styles.titulo}>holaaa</ThemedText>
      <TarjetaCameo
        title="Usuarios activos"
        value="2.438"
        icon={<Text style={styles.icono}>👥</Text>}
        trend="+8,4% este mes"
      />
      <TarjetaCameo
        title="Nuevos clientes"
        value="128"
        icon={<Text style={styles.icono}>✨</Text>}
        trend="+5% este mes"
      />
      <Documentos
        category="Diplomado"
        title="UX Research"
        author="Camila Mendoza"
        institution="UPB"
        onViewFile={() => Alert.alert("Ver archivo", "UX Research")}
        onApprove={() =>
          Alert.alert("Aprobar documento", "UX Research está listo para aprobar.")
        }
      />
      <Documentos
        category="Certificado"
        title="Diseño de experiencia"
        author="Andrés Pérez"
        institution="Universidad de Antioquia"
        onViewFile={() => Alert.alert("Ver archivo", "Diseño de experiencia")}
        onApprove={() =>
          Alert.alert(
            "Aprobar documento",
            "Diseño de experiencia está listo para aprobar.",
          )
        }
      />
      <Publicaciones
        title="Product Designer Senior"
        location="La Paz · Híbrido"
        status="Publicada"
        iconLabel="P"
        onEdit={() =>
          Alert.alert("Editar publicación", "Product Designer Senior")
        }
      />
      <Publicaciones
        title="UX Researcher"
        location="Remoto"
        status="Borrador"
        iconLabel="U"
        onEdit={() => Alert.alert("Editar publicación", "UX Researcher")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    color: "red",
  },
  icono: {
    fontSize: 20,
  },
});