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

export const Swipes = ({ items, setActivity }: any) => {
  const swiperRef = React.useRef(null);
  const [swiping, setSwiping] = React.useState(false);
  const [autoSwipe, setAutoSwipe] = React.useState(true);

  let handleOnSwipedLeft = () => {
    setAutoSwipe(true);
    swiperRef.current.swipeLeft();
  };

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
        ref={swiperRef}
        onSwipedLeft={(e) => {
          if (!autoSwipe) {
            setActivity(`Joel you have rejected ${items[e].name}`);
          }
        }}
        onSwipedRight={(e) => {
          setActivity(`Joel you have selected ${items[e].name}`);
        }}
        verticalSwipe={false}
        animateCardOpacity
        cards={items}
        renderCard={(card) => (
          <View
            onTouchStart={() => {
              console.log("TOUCHED START");
              setSwiping(true);
              setAutoSwipe(false);
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
