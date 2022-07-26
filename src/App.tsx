import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Chats from "./components/Chats";
import Feed from "./components/Feed";
import Protect from "./components/Protect";
import AuthProvider from "./helpers/AuthProvider";
import useAuth from "./helpers/useAuth";
import Auth from "./routes/Auth";
import Signin from "./routes/Auth/Signin";
import Signup from "./routes/Auth/Signup";
import Home from "./routes/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Protect />}>
          <Route element={<Home />}>
            <Route path='/' element={<Feed />} />
            <Route path='chats' element={<Chats />} />
          </Route>
        </Route>
        <Route element={<Auth />}>
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
