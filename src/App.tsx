import { Route, Routes } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<Auth />}>
        <Route path='signup' element={<p>Hello from Sign Up</p>} />
      </Route>
    </Routes>
  );
}

export default App;
