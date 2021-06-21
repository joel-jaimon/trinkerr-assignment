import * as React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import totalItems from "../../constants/photoCards";

export const HistoryCards = ({ card, style }: any) => {
  return (
    <LinearGradient
      // Button Linear Gradient
      key={card.id}
      style={[
        {
          margin: 0,
          padding: 2,
          marginBottom: 20,
          borderRadius: 5,
        },
        style,
      ]}
      colors={["rgb(0,0,0)", "#8A2BE2"]}
    >
      <ImageBackground
        source={totalItems.filter((b: any) => b.id === card.id)[0].photo}
        style={{
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          borderRadius: 5,
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: card?.state === "rejected" ? "red" : "green",
            fontSize: 35,
            fontWeight: "700",
            padding: 25,
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 6,
            shadowOpacity: 0.3,
            elevation: 2,
          }}
        >
          {card.state.toUpperCase()}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              backgroundColor: "#8A2BE2",
              padding: 5,
              color: "white",
            }}
          >
            <Text
              style={[
                {
                  fontWeight: "700",
                },
              ]}
            >
              Date:
            </Text>{" "}
            {`${new Date(card.timestamp).toString().slice(4, 15)} `}
          </Text>
          <Text
            style={{
              backgroundColor: "#8A2BE2",
              padding: 5,
              color: "white",
            }}
          >
            <Text
              style={[
                {
                  fontWeight: "700",
                },
              ]}
            >
              Time:
            </Text>{" "}
            {`${new Date(card.timestamp).toString().slice(16, 21)} `}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(21,21,21)",
          }}
          activeOpacity={0.9}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              padding: 15,
              textAlign: "center",
            }}
          >
            Add this to the{" "}
            {card.state === "rejected" ? "selected" : "rejected"} list? Swipe
            up!{" "}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </LinearGradient>
  );
};
