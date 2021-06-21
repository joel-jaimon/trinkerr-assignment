import { StackActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/Auth";
import { styles as s } from "./signup.styles";

export const SignUp = () => {
  const [number, onChangeNumber] = React.useState("");
  const [otp, onChangeOTP] = React.useState("");
  const [name, onChangeName] = React.useState("");

  const { setAuthUser, setIsAuth } = React.useContext(AuthContext);
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    setState(1);
  }, []);

  const [err, setError] = React.useState<null | string>(null);
  const navigation = useNavigation();

  const handleState1 = (n: string, otp: string) => {
    setState(0);
    if (otp === "0000") {
      setError(null);
      setState(2);
      return;
    }
    setState(1);
    setError("OTP is Invalid.");
  };

  const handleSignup = async () => {
    const signup = axios.post("http://192.168.1.13:4000/register-user", {
      data: {
        name: name,
        number: parseInt(number),
        swiped: [],
      },
    });

    const { data } = await signup;
    console.log(data);
    setAuthUser({
      id: data.document._id,
      name: data.document.name,
      number: data.document.number,
      swiped: data.document.swiped,
    });
    setIsAuth(true);
  };

  return (
    <View style={s.container}>
      <Text style={s.text}>SIGN UP</Text>
      {state === 0 ? (
        <ActivityIndicator size="large" color="#8A2BE2" />
      ) : state === 2 ? (
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={s.input}
            value={name}
            placeholder={"Name"}
            placeholderTextColor="gray"
            onChangeText={(e) => onChangeName(e)}
          />
          <TouchableOpacity
            style={s.btn}
            activeOpacity={0.7}
            onPress={() => handleSignup()}
          >
            <Text style={s.textBtn}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={s.input}
            value={number}
            placeholder={"Number"}
            placeholderTextColor="gray"
            onChangeText={(e) => onChangeNumber(e)}
          />
          <TextInput
            style={s.input}
            value={otp}
            placeholder={"OTP"}
            placeholderTextColor="gray"
            onChangeText={(e) => onChangeOTP(e)}
          />
          <TouchableOpacity
            style={s.btn}
            activeOpacity={0.7}
            onPress={() => handleState1(number, otp)}
          >
            <Text style={s.textBtn}>Next</Text>
          </TouchableOpacity>

          <Text
            style={[
              s.textBtn,
              {
                marginTop: 20,
              },
            ]}
          >
            Already have an account?{" "}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                const pushState = StackActions.push("Login");
                navigation.dispatch(pushState);
              }}
            >
              <Text
                style={{
                  color: "#8A2BE2",
                }}
              >
                Log in.
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
      <Text style={s.err}>{err}</Text>
    </View>
  );
};
