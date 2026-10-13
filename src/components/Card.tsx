import { StyleSheet, Text, View } from "react-native";

export default function Card() {
  return (
    <View>
      <Text style={style.texto}>Carta</Text>
    </View>
  );
}

const style = StyleSheet.create({
  texto: {
    color: "green",
    fontSize: 20,
  },
});
