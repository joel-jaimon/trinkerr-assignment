import * as React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import { AuthContextProvider } from "./context/Auth";

export const Index = () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};

registerRootComponent(Index);
