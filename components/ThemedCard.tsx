import { StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

type ThemedCardProps = React.ComponentProps<typeof View>;

const ThemedCard = ({ style, ...props }: ThemedCardProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View
      style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
