import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header/Header";
import HomeScreen from "../screens/HomeScreen";
import { HistoryScreen } from "../screens/HistoryScreen";

const MainStack = createStackNavigator();

export const AuthorisedStack = () => {
  const headerParam: StackNavigationOptions = {
    headerTitle: (props: any) => <Header {...props} />,
    headerStyle: {
      backgroundColor: "black",
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: "white",
    },
  };
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Home"
          children={HomeScreen}
          options={headerParam}
        />
        <MainStack.Screen
          name="History"
          children={HistoryScreen}
          options={headerParam}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
