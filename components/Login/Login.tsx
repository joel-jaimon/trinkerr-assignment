import * as React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/Auth";
import { styles as s } from "./login.styles";

export const Login = () => {
  const [name, onChangeName] = React.useState("");
  const [pass, onChangePass] = React.useState("");
  const { setAuthUser, setIsAuth } = React.useContext(AuthContext);
  const [err, setError] = React.useState<null | string>(null);

  const checkCredentials = () => {};

  const handleLogin = (n: string, pass: string) => {
    setError(null);
    return;
  };

  return (
    <View style={s.container}>
      <Text style={s.text}>LOGIN </Text>
      <TextInput
        style={s.input}
        value={name}
        placeholder={"Name"}
        placeholderTextColor="gray"
        onChangeText={(e) => onChangeName(e)}
      />
      <TextInput
        style={s.input}
        value={pass}
        placeholder={"Password"}
        placeholderTextColor="gray"
        onChangeText={(e) => onChangePass(e)}
      />
      <TouchableOpacity
        style={s.btn}
        activeOpacity={0.7}
        onPress={() => handleLogin(name, pass)}
      >
        <Text style={s.textBtn}>Submit</Text>
      </TouchableOpacity>
      <Text style={s.err}>{err}</Text>
    </View>
  );
};
