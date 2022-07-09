import React, { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../helpers/useAuth";

type Props = {
  children?: JSX.Element;
};

const Protect: FC<Props> = ({ children }) => {
  // let auth = useAuth();
  let location = useLocation();
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    return <Navigate to='/signup' state={{ from: location }} replace />;
  }

  return children;
};

export default Protect;
