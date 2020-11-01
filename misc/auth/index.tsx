import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { auth } from "config/firebase";
import nookies from "nookies";

interface IAuthContext {
  user: firebase.User | null;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.destroy(undefined, "token");
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {
        sameSite: true,
        secure: process.env.NEXT_PUBLIC_ENV === "production",
      });
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
