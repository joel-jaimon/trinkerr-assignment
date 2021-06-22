import axios from "axios";
import * as React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/Auth";
import { styles as s } from "./login.styles";

import Constants from "expo-constants";
const ENDPOINT = Constants.manifest.extra!.SERVER
  ? Constants.manifest.extra!.SERVER_URL
  : Constants.manifest.extra!.LOCAL_URL;

export const Login = () => {
  const [name, onChangeName] = React.useState("");
  const [pass, onChangePass] = React.useState("");
  const { setAuthUser, setIsAuth } = React.useContext(AuthContext);
  const [err, setError] = React.useState<any>(null);

  const checkCredentials = async (name: string, num: string) => {
    await axios.get(`${ENDPOINT}/users/${num}`).then((e) => {
      try {
        if (e.data[0].name === name) {
          setAuthUser({
            id: e.data[0]._id,
            name: e.data[0].name,
            number: e.data[0].number,
            swiped: e.data[0].swiped,
          });
          setIsAuth(true);
        }
      } catch {
        setError({
          type: "",
          msg: "Invalid Credentials, Please check again.",
        });
        return false;
      }
    });
  };

  const validater = async (name: string, pass: string) => {
    if (!name) {
      setError({
        type: "name",
        msg: "Please enter your name.",
      });
      return false;
    }
    if (name.length < 2) {
      setError({
        type: "name",
        msg: "Please enter a valid name.",
      });
      return false;
    }

    if (!pass) {
      setError({
        type: "pass",
        msg: "Please enter you password.",
      });
      return false;
    }

    if (!/^[0-9]*$/.test(pass) || pass.length < 10) {
      setError({
        type: "pass",
        msg: "Invalid credentials, Try again.",
      });
      return false;
    }

    await checkCredentials(name, pass);
    return true;
  };

  const handleLogin = (n: string, pass: string) => {
    validater(n, pass);
  };

  return (
    <View style={s.container}>
      <Text style={s.text}>LOGIN </Text>
      <TextInput
        style={[
          s.input,
          {
            borderBottomColor: err?.type === "name" ? "red" : "black",
            borderBottomWidth: 2,
          },
        ]}
        value={name}
        placeholder={"Name"}
        placeholderTextColor="gray"
        onChangeText={(e) => onChangeName(e)}
      />
      <TextInput
        style={[
          s.input,
          {
            borderBottomColor: err?.type === "pass" ? "red" : "black",
            borderBottomWidth: 2,
          },
        ]}
        value={pass}
        placeholder={"Password"}
        placeholderTextColor="gray"
        onChangeText={(e) => onChangePass(e)}
      />
      <Text
        style={{
          color: err?.msg ? "red" : "gray",
          marginTop: 20,
          marginBottom: -15,
        }}
      >
        {err?.msg ?? "Password is your number for this assignment."}
      </Text>
      <TouchableOpacity
        style={s.btn}
        activeOpacity={0.7}
        onPress={() => handleLogin(name, pass)}
      >
        <Text style={s.textBtn}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
