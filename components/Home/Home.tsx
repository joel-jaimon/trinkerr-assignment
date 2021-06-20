import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Swipes } from "./Components/Swipe/Swipes";
import { cards } from "./Components/Cards/sample/data";

function Home() {
  const [index, setIndex] = React.useState(0);

  const handleLike = () => {
    console.log("LIKED");
    handleDislike();
  };

  const handleDislike = () => {
    const nextIndex = cards.length - 2 === index ? 0 : index + 1;
    setIndex(nextIndex);
  };

  return (
    <SafeAreaView>
      <Text></Text>
      {cards.map((_, i) => {
        return (
          i === index && (
            <Swipes
              key={i}
              currentIndex={index}
              handleDislike={handleDislike}
              user={cards}
              setIndex={setIndex}
              handleLike={handleLike}
            />
          )
        );
      })}
    </SafeAreaView>
  );
}

export default Home;
