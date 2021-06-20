import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screens/LoginScreen";
import Header from "../components/Header/Header";
import { SignupScreen } from "../screens/SignupScreen";

const UnAuthStack = createStackNavigator();

export const UnAuthorisedStack = () => {
  const headerParam: StackNavigationOptions = {
    headerTitle: (props: any) => <Header {...props} />,
    headerStyle: {
      backgroundColor: "black",
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
  };
  return (
    <NavigationContainer>
      <UnAuthStack.Navigator>
        <UnAuthStack.Screen
          name="SignUp"
          children={SignupScreen}
          options={headerParam}
        />
        <UnAuthStack.Screen
          name="Login"
          children={LoginScreen}
          options={headerParam}
        />
      </UnAuthStack.Navigator>
    </NavigationContainer>
  );
};
