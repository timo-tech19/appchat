import { Models } from "appwrite";
import * as React from "react";
import api from "../api/api";

interface AuthContextType {
  session: Models.Session;
  setSession: React.Dispatch<any>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: (callback: VoidFunction) => void;
}
type Props = { children: React.ReactNode };

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: Props) {
  const [session, setSession] = React.useState<any>(null);

  const createSession = async (email: string, password: string) => {
    try {
      let data = await api.account.createSession(email, password);
      setSession(data);
      localStorage.setItem("session", JSON.stringify(data));
      return true;
    } catch (err) {
      alert(err.message);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await api.account.create("unique()", email, password, name);
      return createSession(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const signin = (email: string, password: string) => {
    return createSession(email, password);
  };

  const signout = () => {};

  let value = { signup, signin, signout, session, setSession };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
