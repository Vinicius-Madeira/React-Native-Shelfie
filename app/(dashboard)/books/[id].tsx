import { StyleSheet } from "react-native";
import React from "react";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useLocalSearchParams } from "expo-router";

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  return (
    <ThemedView safe style={styles.container}>
      <ThemedText>Book Details - {id}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
