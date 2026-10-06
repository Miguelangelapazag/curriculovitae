import { ThemedText } from "@/components/themed-text";
import { Link, Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <ThemedText style={styles.titulo}> estoy en todos lados </ThemedText>
      <Link href="/">
        <ThemedText style={styles.titulo}> index </ThemedText>
      </Link>
      <Link href="/explore">
        <ThemedText style={styles.titulo}> explore </ThemedText>
      </Link>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="index"
      />
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "blue",
    margin: 20,
  },
});
