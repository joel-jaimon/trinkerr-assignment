import * as React from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { styles as s } from "./history.styles";
import items from "../../constants/photoCards";
import axios from "axios";
import { AuthContext } from "../../context/Auth";

const { _, height } = Dimensions.get("window");

export const History = () => {
  const [data, setData] = React.useState(null);
  const { authUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    axios.get(`http://localhost:4000/users/${authUser?.number}`).then((e) => {
      setData(e.data[0]);
    });
  }, []);

  console.log(data);

  return (
    <View style={s.container}>
      <ScrollView
        style={{
          width: "100%",
          height: height,
        }}
      >
        {data?.swiped?.map((e) => {
          return (
            <ImageBackground
              source={items.filter((b) => b.id === e.id)[0].photo}
              style={{
                height: 500,
                margin: 15,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "flex-end",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: e?.state === "rejected" ? "red" : "green",
                  fontSize: 35,
                  fontWeight: "700",
                  padding: 25,
                }}
              >
                {e.state.toUpperCase()}
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
                    borderRadius: 2,
                  }}
                >
                  18 Aug 2020
                </Text>
                <Text
                  style={{
                    backgroundColor: "#8A2BE2",
                    padding: 5,
                    color: "white",
                    borderRadius: 2,
                  }}
                >
                  09:20 PM
                </Text>
              </View>
            </ImageBackground>
          );
        })}
      </ScrollView>
    </View>
  );
};
