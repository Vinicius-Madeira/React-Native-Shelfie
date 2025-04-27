import { useColorScheme, TextInput } from "react-native";
import { Colors } from "../constants/Colors";

type ThemedTextInputProps = React.ComponentProps<typeof TextInput>;

const ThemedTextInput = ({ style, ...props }: ThemedTextInputProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      placeholderTextColor={theme.text}
      {...props}
    />
  );
};

export default ThemedTextInput;
