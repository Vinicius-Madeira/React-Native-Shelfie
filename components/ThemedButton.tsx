import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";

type ThemedButtonProps = React.ComponentProps<typeof Pressable> & {
  style?: ViewStyle | ViewStyle[];
};

function ThemedButton({ style, ...props }: ThemedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    />
  );
}

export default ThemedButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
