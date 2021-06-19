import * as React from "react";
import { Text, View } from "react-native";
import { styles as s } from "./headers";

const Header = (props: any) => {
  const headers = {
    home: {
      title: "Home ",
    },
  };
  return (
    <View>
      <Text
        style={{
          ...s.default,
        }}
      >
        {/* @ts-ignore */}
        {headers[props.children].title}
      </Text>
    </View>
  );
};

export default Header;
