import * as React from "react";
import { View, Dimensions, ActivityIndicator, Text } from "react-native";
import { styles as s } from "./history.styles";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import { Swipes } from "../Swipe/Swipes";
import { HistoryCards } from "../HistoryCards/HistoryCards";

//@ts-ignore
const { __, height } = Dimensions.get("window");

export const History = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { authUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      await axios
        .get(`http://192.168.1.13:4000/users/${authUser?.number}`)
        .then((e) => {
          setData(e.data[0]);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    })();
  }, []);

  //swiper hooks
  const swiperRef = React.useRef(null);

  const updateArray = async (id: string, selectionState: string) => {
    await axios
      .put(
        `http://192.168.1.13:4000/users/${authUser?.id}/update-selection/${id}`,
        {
          data: selectionState,
        }
      )
      .then((e) => {
        let oldData: any = data;
        let swiped = oldData.swiped;
        let obj = swiped.filter((e: any) => e.id === id)[0];
        obj.state = selectionState;
        oldData.swiped[swiped.indexOf(obj)] = obj;
        setData(oldData);
      })
      .catch((e) => console.log(e));
  };

  const handleLeftSwipe = (e: number) => {
    updateArray(
      data?.swiped[e].id,
      data?.swiped[e].state === "rejected" ? "selected" : "rejected"
    );
  };

  const swiped = data?.swiped;

  console.log(swiped);

  return (
    <View style={s.container}>
      {!loading ? (
        swiped && swiped?.length != 0 ? (
          <Swipes
            style={{
              height: height,
            }}
            ref={swiperRef}
            verticalSwipe={true}
            onSwipedTop={handleLeftSwipe}
            items={swiped}
            infinite={true}
            stackSeparation={25}
            horizontalSwipe={true}
          >
            <HistoryCards
              style={{
                height: height * 0.7,
              }}
            />
          </Swipes>
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              height: height,
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              You have not selected / rejected anything.
            </Text>
          </View>
        )
      ) : (
        <ActivityIndicator color={"blue"} size="large" />
      )}
    </View>
  );
};
