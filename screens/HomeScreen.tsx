import React from "react";
import { View } from "react-native";
import Home from "../components/Home/Home";

const HomeScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Home />
    </View>
  );
};

export default HomeScreen;
