import * as React from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { styles as s } from "./history.styles";
import items from "../../constants/photoCards";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import { LinearGradient } from "expo-linear-gradient";

//@ts-ignore
const { __, height } = Dimensions.get("window");

export const History = () => {
  const [data, setData] = React.useState(null);
  const { authUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    axios
      .get(`http://192.168.1.13:4000/users/${authUser?.number}`)
      .then((e) => {
        setData(e.data[0]);
      });
  }, []);

  const updateArray = async (id: string, state: string) => {
    axios
      .put(
        `http://192.168.1.13:4000/users/${authUser?.number}/update-selection/${id}`,
        {
          data: state,
        }
      )
      .then((e) => {
        setData(e.data[0]);
      });
  };

  return (
    <View style={s.container}>
      <ScrollView
        snapToAlignment="end"
        showsVerticalScrollIndicator={true}
        style={{
          width: "100%",
        }}
      >
        {data?.swiped?.map((e) => {
          return (
            <LinearGradient
              // Button Linear Gradient
              key={e.id}
              style={{
                margin: 15,
                padding: 2,
                marginBottom: 20,
                borderRadius: 5,
              }}
              colors={["rgb(0,0,0)", "#8A2BE2"]}
            >
              <ImageBackground
                source={items.filter((b) => b.id === e.id)[0].photo}
                style={{
                  height: 500,
                  backgroundColor: "white",
                  display: "flex",
                  borderRadius: 5,
                  justifyContent: "flex-end",
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
                    {`${new Date(e.timestamp).toString().slice(4, 15)} `}
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
                    {`${new Date(e.timestamp).toString().slice(16, 21)}  `}
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
                    Add to {e.state === "rejected" ? "selected" : "rejected"}{" "}
                    list.{" "}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </LinearGradient>
          );
        })}
      </ScrollView>
    </View>
  );
};
