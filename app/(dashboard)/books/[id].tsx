import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Book } from "../../../contexts/BooksContext";
import useBooks from "../../../hooks/useBooks";
import Spacer from "../../../components/Spacer";
import ThemedCard from "../../../components/ThemedCard";
import ThemedLoader from "../../../components/ThemedLoader";
import ThemedButton from "../../../components/ThemedButton";
import { Colors } from "../../../constants/Colors";

export default function BookDetails() {
  const [book, setBook] = useState<Book | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { fetchBookById, deleteBook } = useBooks();

  async function handleDelete() {
    await deleteBook(id as string);
    setBook(null);
    router.replace("/books");
  }

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

      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Delete Book</Text>
      </ThemedButton>
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
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
});
