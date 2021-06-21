import * as React from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";

export const Swipes = React.forwardRef((props: any, ref: any) => {
  return (
    <View style={props.style}>
      <Swiper
        ref={ref}
        onSwipedTop={props?.onSwipedTop}
        onSwipedBottom={props?.onSwipedBottom}
        onSwipedLeft={props?.onSwipedLeft}
        onSwipedRight={props?.onSwipedRight}
        verticalSwipe={props?.verticalSwipe ?? false}
        horizontalSwipe={props?.horizontalSwipe ?? false}
        animateCardOpacity
        horizontalThreshold={100}
        verticalThreshold={120}
        disableBottomSwipe={true}
        disableLeftSwipe={props.items.length < 2}
        disableTopSwipe={false}
        disableRightSwipe={props.items.length < 2}
        cards={props.items}
        renderCard={(card) => (
          <View
            onTouchStart={props.handleTouchStart}
            onTouchEnd={props.handleTouchEnd}
          >
            {React.cloneElement(props.children, { card })}
          </View>
        )}
        cardIndex={0}
        backgroundColor="black"
        stackSize={props.items.length < 3 ? props.items.length : 3}
        stackSeparation={props?.stackSeparation}
        infinite={props?.infinite ?? false}
        onSwipedAll={() => console.log("Done Swiping")}
        showSecondCard
        animateOverlayLabelsOpacity
      />
    </View>
  );
});
