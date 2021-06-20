import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

const Cards = ({ user }: any) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={user.img} />
      <Text></Text>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  img: {
    width: "90%",
    marginLeft: "5%",
    height: height * 0.8,
    padding: 25,
    backgroundColor: "white",
  },
});
