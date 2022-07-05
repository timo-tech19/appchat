import React from "react";
import { AuthContext } from "./AuthProvider";

export default function useAuth() {
  return React.useContext(AuthContext);
}
