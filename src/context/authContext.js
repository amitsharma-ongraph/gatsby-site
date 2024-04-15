import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../packages/admin";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: null,
    isLoading: true,
  });

  useEffect(() => {
    return onAuthStateChanged(auth, async (__user) => {
      document.cookie = `sessionId=${
        __user ? await __user.getIdToken() : ""
      }; expires=Sun, 1 Jan 2050 00:00:00 UTC; path=/;`;

      setAuthState({
        userId: __user ? __user.uid : null,
        isLoading: false,
      });
    });
  }, []);
  return (
    <authContext.Provider value={[authState, setAuthState]}>
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider };
