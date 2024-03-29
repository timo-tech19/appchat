import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../helpers/useAuth";

type Props = {
  children?: JSX.Element;
};

const Protect: FC<Props> = () => {
  // let auth = useAuth();
  let location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default Protect;
