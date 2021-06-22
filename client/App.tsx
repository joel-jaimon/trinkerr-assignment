import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "./context/Auth";
import { AuthorisedStack } from "./stacks/AuthorisedStacks";
import { UnAuthorisedStack } from "./stacks/UnAuthorisedStacks";

const App = () => {
  const { isAuth } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {isAuth ? <AuthorisedStack /> : <UnAuthorisedStack />}
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
