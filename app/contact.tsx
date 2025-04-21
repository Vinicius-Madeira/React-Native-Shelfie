import { Link } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import { Colors } from "../constants/Colors";

const Contact = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ThemedText style={styles.title}>Contact Page</ThemedText>

      <Link href="/" style={[styles.link]}>
        <ThemedText>Back Home</ThemedText>
      </Link>
      <Link href="/about" style={styles.link}>
        <ThemedText>About Page</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
