import { Models } from "appwrite";
import * as React from "react";
import api from "../api/api";

interface AuthContextType {
  user: any;
  signup: (name: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => void;
  signout: (callback: VoidFunction) => void;
}
type Props = { children: React.ReactNode };

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<any>(null);

  const signup = async (name: string, email: string, password: string) => {
    try {
      let data = await api.account.create("unique()", email, password, name);
      setUser(data);
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      let data = await api.account.createSession(email, password);
      console.log(data);
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };

  const signout = () => {};

  let value = { signup, signin, signout, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
