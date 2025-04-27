import { useColorScheme, Text } from "react-native";
import { Colors } from "../constants/Colors";

type ThemedTextProps = React.ComponentProps<typeof Text> & {
  title?: boolean;
};

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
