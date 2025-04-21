import { useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

const ThemedView = ({ style, ...props }: any) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  );
};

export default ThemedView;
