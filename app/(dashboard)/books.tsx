import { StyleSheet, FlatList, Pressable } from "react-native";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import useBooks from "../../hooks/useBooks";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import ThemedLoader from "../../components/ThemedLoader";

function Books() {
  const { books } = useBooks();
  const router = useRouter();

  if (!books) {
    return (
      <ThemedView style={styles.container} safe>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title style={styles.heading}>
        Your Reading List
      </ThemedText>
      <Spacer />

      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push(`/books/${item.$id}`);
            }}
          >
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>{item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
        ListEmptyComponent={
          <ThemedText>No books in your reading list yet.</ThemedText>
        }
      />
    </ThemedView>
  );
}

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    // justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
