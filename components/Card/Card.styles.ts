import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default StyleSheet.create({
  card: {
    display: "flex",
    height: height * 0.55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
  photoDescriptionContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
    height: "100%",
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
});
