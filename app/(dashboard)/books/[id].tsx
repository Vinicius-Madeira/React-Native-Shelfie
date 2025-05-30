import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { Book } from "../../../contexts/BooksContext";
import useBooks from "../../../hooks/useBooks";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";

export default function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const { id } = useLocalSearchParams();
  const { fetchBookById } = useBooks();

  console.log("id: ", id);

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBookById(id as string);
      setBook(bookData);
    }

    loadBook();
  }, [id]);

  if (!book) {
    return (
      <ThemedView safe style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written by {book.author}</ThemedText>
        <Spacer />

        <ThemedText title>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
});
