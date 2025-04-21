import { StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";

const Login = () => {
  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title style={styles.title}>
        Login to Your Account
      </ThemedText>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({});
