import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AuthorisedStack } from "./stacks/AuthorisedStacks";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AuthorisedStack />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
