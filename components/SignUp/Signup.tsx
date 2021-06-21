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

import Constants from "expo-constants";
const ENDPOINT = Constants.manifest.extra!.SERVER
  ? Constants.manifest.extra!.SERVER_URL
  : Constants.manifest.extra!.LOCAL_URL;

export const SignUp = () => {
  const [number, onChangeNumber] = React.useState("");
  const [otp, onChangeOTP] = React.useState("");
  const [name, onChangeName] = React.useState("");

  const { setAuthUser, setIsAuth } = React.useContext(AuthContext);
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    setState(1);
  }, []);

  const [err, setError] = React.useState<any>(null);
  const navigation = useNavigation();

  const validatorState1 = async (number: string, otp: string) => {
    if (!number) {
      setError({
        type: "number",
        msg: "Please enter a number.",
      });
      return false;
    }

    if (!/^[0-9]*$/.test(number) || number.length < 10) {
      setError({
        type: "number",
        msg: "Please enter a valid number.",
      });
      return false;
    }

    const { data } = await axios.get(`${ENDPOINT}/users/${number}`);

    if (data[0]) {
      setError({
        type: "number",
        msg: "Account already exists! Please login.",
      });
      return false;
    }

    if (!otp) {
      setError({
        type: "otp",
        msg: "Please enter an otp.",
      });
      return false;
    }

    if (!/^[0-9]*$/.test(otp) || otp.length < 4) {
      setError({
        type: "otp",
        msg: "OTP must have four numbers.",
      });
      return false;
    }

    return true;
  };

  const validatorState2 = (name: string) => {
    if (/^[a-zA-Z]*$/.test(name) && name.length < 2) return false;
    return true;
  };

  const handleState1 = async (n: string, otp: string) => {
    // setState(0);
    if (await validatorState1(n, otp)) {
      if (otp === "0000") {
        setError(null);
        setState(2);
        return;
      } else {
        setError({
          type: "",
          msg: "OTP is invalid.",
        });
        setState(1);
        return;
      }
    }
  };

  const handleSignup = async () => {
    if (validatorState2(name)) {
      const signup = axios.post(`${ENDPOINT}/register-user`, {
        data: {
          name: name,
          number: parseInt(number),
          swiped: [],
        },
      });

      const { data } = await signup;

      setAuthUser({
        id: data.document._id,
        name: data.document.name,
        number: data.document.number,
        swiped: data.document.swiped,
      });
      setIsAuth(true);
    }
  };

  const handleExistingUser = () => {
    const pushState = StackActions.push("Login");
    navigation.dispatch(pushState);
  };
  return (
    <View style={s.container}>
      <Text style={s.text}>SIGN UP </Text>
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
            style={[
              s.input,
              {
                borderBottomColor: err?.type === "number" ? "red" : "black",
                borderBottomWidth: 2,
              },
            ]}
            value={number}
            placeholder={"Number"}
            keyboardType="number-pad"
            placeholderTextColor="gray"
            maxLength={10}
            onChangeText={(e) => onChangeNumber(e)}
          />
          <TextInput
            style={[
              s.input,
              {
                borderBottomColor: err?.type === "otp" ? "red" : "black",
                borderBottomWidth: 2,
              },
            ]}
            value={otp}
            placeholder={"OTP"}
            keyboardType="number-pad"
            placeholderTextColor="gray"
            maxLength={4}
            onChangeText={(e) => onChangeOTP(e)}
          />
          <Text style={s.err}>{err?.msg}</Text>

          <TouchableOpacity
            style={s.btn}
            activeOpacity={0.7}
            onPress={() => handleState1(number, otp)}
          >
            <Text style={s.textBtn}>Next</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              marginTop: 25,
            }}
          >
            Or
          </Text>
          <Text
            style={[
              s.textBtn,
              {
                marginTop: 20,
              },
            ]}
          >
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: "#8A2BE2",
              padding: 10,
              borderRadius: 5,
              width: "50%",
              marginTop: 5,
            }}
            onPress={handleExistingUser}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
