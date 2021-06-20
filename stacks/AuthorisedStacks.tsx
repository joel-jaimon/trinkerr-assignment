import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Header from "../components/Header/Header";
import HomeScreen from "../screens/HomeScreen";

const MainStack = createStackNavigator();

export const AuthorisedStack = (props: any) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="home"
          children={HomeScreen}
          options={{
            headerTitle: (props: any) => <Header {...props} />,
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
