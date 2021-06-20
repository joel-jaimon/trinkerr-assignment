import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screens/LoginScreen";
import Header from "../components/Header/Header";

const MainStack = createStackNavigator();

export const AuthorisedStack = () => {
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
      <MainStack.Navigator>
        <MainStack.Screen
          name="Login"
          children={LoginScreen}
          options={headerParam}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
