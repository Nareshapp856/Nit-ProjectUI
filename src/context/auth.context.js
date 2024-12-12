import { createContext, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";

const AuthCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userType: false,
  setUserType: () => {},
});

export function AuthCtxProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    LocalStorage.auth ? true : false
  );
  const [loginData, setLoginData] = useState({ type: "user", userName: "" });

  return (
    <AuthCtx.Provider
      value={{ isLoggedIn, setIsLoggedIn, loginData, setLoginData }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export default AuthCtx;
