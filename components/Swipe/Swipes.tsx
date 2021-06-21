import * as React from "react";
import { View } from "react-native";
import Card from "../Card/Card";
import Swiper from "react-native-deck-swiper";
import styles from "./swipes.styles";

export const Swipes = React.forwardRef((props: any, ref: any) => {
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        ref={ref}
        onSwipedLeft={props.onSwipedLeft}
        onSwipedRight={props.onSwipedRight}
        verticalSwipe={false}
        animateCardOpacity
        cards={props.items}
        renderCard={(card) => (
          <View
            onTouchStart={props.handleTouchStart}
            onTouchEnd={props.handleTouchEnd}
          >
            <Card card={card} />
          </View>
        )}
        cardIndex={0}
        backgroundColor="black"
        stackSize={3}
        infinite
        onSwipedAll={() => console.log("Done Swiping")}
        showSecondCard
        animateOverlayLabelsOpacity
      />
    </View>
  );
});
