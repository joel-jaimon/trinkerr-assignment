import * as React from "react";
import { Text, View, TextInput } from "react-native";
import { styles as s } from "./login.styles";

export const Login = () => {
  const [name, onChangeName] = React.useState("");
  const [passcode, onChangePassCode] = React.useState("");

  return (
    <View style={s.container}>
      <Text style={s.text}>LOGIN</Text>
      <TextInput
        style={s.input}
        value={name}
        placeholder={"Name"}
        placeholderTextColor="gray"
        onChangeText={(e) => onChangeName(e)}
      />
      <TextInput
        style={s.input}
        value={passcode}
        placeholder={"OTP"}
        placeholderTextColor="gray"
        onChangeText={(e) => onChangePassCode(e)}
      />
    </View>
  );
};
