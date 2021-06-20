import * as React from "react";

export interface AUTHCONTEXTTYPES {
  isAuth: boolean;
  authUser: null | USER;
  setIsAuth: React.SetStateAction<boolean>;
  setAuthUser: React.SetStateAction<USER>;
}

export interface USER {
  id: string;
  name: string;
  number: number;
  selected: any[];
  rejected: any[];
}

export const AuthContext = React.createContext({
  isAuth: false,
  authUser: null as null | USER,
  setIsAuth: (x: boolean) => {},
  setAuthUser: (x: USER) => {},
});

export const AuthContextProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [authUser, setAuthUser] = React.useState<null | USER>(null);

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        authUser: authUser,
        setIsAuth: setIsAuth,
        setAuthUser: setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
