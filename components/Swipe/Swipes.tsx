import * as React from "react";
import { View } from "react-native";
import Card from "../Card/Card";
import Swiper from "react-native-deck-swiper";
import styles from "./swipes.styles";

const debounce = (callback: any, wait: number) => {
  let timeout = null as any;
  return (...args: any) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

export const Swipes = ({ items }: any) => {
  const swiperRef = React.createRef();
  const [swiping, setSwiping] = React.useState(0);
  let handleOnSwipedLeft = () => swiperRef.current.swipeLeft();

  React.useEffect(() => {
    let interval = setInterval(handleOnSwipedLeft, 5000);
    if (swiping) {
      clearInterval(interval);
    } else {
      clearInterval(interval);
      interval = setInterval(handleOnSwipedLeft, 5000);
    }
    return () => clearInterval(interval);
  }, [swiping]);

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        //@ts-ignore
        ref={swiperRef}
        // onSwipedLeft={(e) => {
        //   console.log("LEFT", items[e]);
        // }}
        // onSwipedRight={(e) => {
        //   console.log("RIGHT", items[e]);
        // }}
        verticalSwipe={false}
        animateCardOpacity
        containerStyle={styles.container}
        cards={items}
        renderCard={(card) => (
          <View
            onTouchStart={() => {
              console.log("TOUCHED START");
              setSwiping(true);
            }}
            onTouchEnd={() => {
              console.log("TOUCHED END");
              setSwiping(false);
            }}
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
};
