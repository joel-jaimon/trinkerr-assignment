import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  swiperContainer: {
    height: height * 0.7,
  },
});
