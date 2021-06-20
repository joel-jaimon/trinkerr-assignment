import * as React from "react";
import { View, Text } from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import Cards from "../Cards/Cards";

export const Swipes = ({
  user,
  currentIndex,
  setIndex,
  handleLike,
  handleDislike,
}: any) => {
  const renderLeftAction = () => (
    <RectButton style={{ flex: 1 }}>
      <Cards user={user[currentIndex + 1]} />
    </RectButton>
  );

  const renderRightAction = () => (
    <RectButton style={{ flex: 1 }}>
      <Cards user={user[currentIndex + 1]} />
    </RectButton>
  );

  return (
    <Swipeable
      friction={1}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftAction}
      renderRightActions={renderRightAction}
      onSwipeableLeftOpen={handleLike}
      onSwipeableRightOpen={handleDislike}
    >
      {<Cards user={user[currentIndex]} />}
    </Swipeable>
  );
};
