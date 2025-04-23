import { StyleSheet } from "react-native";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

function Books() {
  return (
    <ThemedView style={styles.container} safe>
      <ThemedText title style={styles.heading}>
        Your Reading List
      </ThemedText>
    </ThemedView>
  );
}

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
