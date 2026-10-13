import { StyleSheet, Text, View } from "react-native";

export default function TagHabilidad({ texto }: { texto: string }) {
  return (
    <View style={styles.tag}>
      <Text>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#dff3ff",
    padding: 5,
    borderRadius: 8,
    marginRight: 5,
  },
});
