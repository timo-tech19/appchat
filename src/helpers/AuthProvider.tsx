import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import * as React from "react";
import { auth } from "../api/api";

interface AuthContextType {
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
type Props = { children: React.ReactNode };

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: Props) {
  const [user, setUser] = React.useState<User>(auth.currentUser);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: name });
      setUser(userCredentials.user);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const signout = async () => {
    setUser(null);
    signOut(auth);
  };

  let value = { signup, signout, signin, user, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
