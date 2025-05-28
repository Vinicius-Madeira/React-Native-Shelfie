import { ActivityIndicator, Text, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import ThemedView from "./ThemedView";

export default function ThemedLoader() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>
        <ActivityIndicator size="large" color={theme.text} />;
      </Text>
    </ThemedView>
  );
}
