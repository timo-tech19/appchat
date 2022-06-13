import { Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Signin from "./routes/Auth/Signin";
import Signup from "./routes/Auth/Signup";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<Auth />}>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
