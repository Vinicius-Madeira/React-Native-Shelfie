import { StyleSheet } from "react-native";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import useUser from "../../hooks/useUser";
import ThemedButton from "../../components/ThemedButton";

function Profile() {
  const { logout, user } = useUser();

  return (
    <ThemedView style={styles.container}>
      <ThemedText title style={styles.heading}>
        {user?.email ? user?.email : "Your email"}
      </ThemedText>
      <Spacer />
      <ThemedText>Time to start reading some books...</ThemedText>
      <Spacer />

      <ThemedButton onPress={logout}>
        <ThemedText>Logout</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
