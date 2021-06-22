import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: "100%",
  },
  text: {
    color: "#8A2BE2",
    fontSize: 25,
    fontWeight: "700",
    marginTop: -50,
    marginBottom: 20,
  },
  input: {
    color: "white",
    backgroundColor: "rgb(21,21,21)",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    marginTop: 15,
  },

  btn: {
    backgroundColor: "#8A2BE2",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    marginTop: 25,
  },

  textBtn: {
    color: "white",
    textAlign: "center",
  },

  err: {
    color: "red",
    position: "relative",
    textAlign: "center",
    margin: 20,
    marginBottom: -10,
  },
});
