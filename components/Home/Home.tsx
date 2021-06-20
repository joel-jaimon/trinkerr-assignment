import { StackActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { photoCards } from "../../constants";
import { AuthContext } from "../../context/Auth";
import { Swipes } from "../Swipe/Swipes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { authUser } = React.useContext(AuthContext);
  const [activity, setActivity] = React.useState<null | string>(
    `Hi ${authUser?.name}`
  );
  const navigation = useNavigation();
  const pushAction = StackActions.push("History", {});

  return (
    <View style={styles.container}>
      <Swipes setActivity={setActivity} items={photoCards} />
      <View
        style={{
          height: 300,
        }}
      >
        {activity && (
          <Text
            style={[
              styles.text,
              {
                color: activity.includes("rejected") ? "red" : "green",
              },
            ]}
          >
            {activity}
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.dispatch(pushAction);
          }}
        >
          <Text
            style={{
              color: "white",
              position: "relative",
              textAlign: "center",
              zIndex: 20,
              width: "90%",
              marginLeft: "5%",
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#8A2BE2",
              marginBottom: 20,
            }}
          >
            View History
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: 20,
    fontSize: 18,
  },
});

export default Home;
