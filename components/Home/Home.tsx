import { StackActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { photoCards as items } from "../../constants";
import { AuthContext } from "../../context/Auth";
import { Swipes } from "../Swipe/Swipes";
import Card from "../Card/Card";
import axios from "axios";

const Home = () => {
  const { authUser } = React.useContext(AuthContext);
  const [activity, setActivity] = React.useState<null | string>(
    `Hi ${authUser?.name}`
  );
  const navigation = useNavigation();
  const pushAction = StackActions.push("History", {});

  const swiperRef = React.useRef(null);
  const [swiping, setSwiping] = React.useState(false);
  const [autoSwipe, setAutoSwipe] = React.useState(true);

  const handleCardTouchStart = () => {
    console.log("TOUCHED START");
    setSwiping(true);
    setAutoSwipe(false);
  };

  const handleCardTouchEnd = () => {
    console.log("TOUCHED END");
    setSwiping(false);
  };

  const handleLeftSwipe = (e: number) => {
    if (!autoSwipe) {
      handleDefaultSwipes(items[e].id, "rejected");
      setActivity(`Joel you have rejected ${items[e].name}`);
    }
  };

  const handleRightSwipe = (e: number) => {
    handleDefaultSwipes(items[e].id, "selected");
    setActivity(`Joel you have selected ${items[e].name}`);
  };

  const autoSwipeLeft = () => {
    setAutoSwipe(true);
    swiperRef.current.swipeLeft();
  };

  const handleDefaultSwipes = async (id: string, selectionState: string) => {
    await axios
      .put(`http://192.168.1.13:4000/update-swiped/${authUser?.id}`, {
        data: {
          id,
          state: selectionState,
          timestamp: new Date().getTime(),
        },
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    let interval = setInterval(autoSwipeLeft, 5000);
    if (swiping) {
      clearInterval(interval);
    } else {
      clearInterval(interval);
      interval = setInterval(autoSwipeLeft, 5000);
    }
    return () => clearInterval(interval);
  }, [swiping]);

  return (
    <View style={styles.container}>
      <Swipes
        ref={swiperRef}
        onSwipedRight={handleRightSwipe}
        onSwipedLeft={handleLeftSwipe}
        items={items}
        handleTouchStart={handleCardTouchStart}
        handleTouchEnd={handleCardTouchEnd}
      >
        <Card />
      </Swipes>
      <View
        style={{
          height: 300,
        }}
      >
        <View
          style={{
            backgroundColor: "black",
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
                marginBottom: 50,
              }}
            >
              View History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "black",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: 20,
    fontSize: 18,
  },
});

export default Home;
