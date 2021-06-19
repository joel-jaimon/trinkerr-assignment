import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthorisedStack } from "./stacks/AuthorisedStacks";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AuthorisedStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
    color: "white",
    width: "100%",
  },
});
