import { createContext, useEffect, useState } from "react";
import { deleteStorage, getStorage, setStorage } from "../helpers/storage";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    try {
      const token = await getStorage("access_token");
      if (token) {
        setLogin(token);
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }
  }

  async function setToken(value) {
    try {
      await setStorage("access_token", value);
      setLogin(value);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteToken() {
    try {
      await deleteStorage("access_token");
      setLogin(null);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <LoginContext.Provider value={{ login, setToken, deleteToken }}>
      {children}
    </LoginContext.Provider>
  );
}
