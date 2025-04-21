import { View } from "react-native";

const Spacer = ({ width = 100, height = 40 }) => {
  return <View style={{ width: `${width}%`, height }} />;
};

export default Spacer;
