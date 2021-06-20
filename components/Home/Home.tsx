import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { photoCards } from "../../constants";
import { Swipes } from "../Swipe/Swipes";

const Home = () => {
  return (
    <View style={styles.container}>
      <Swipes items={photoCards} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Home;
