import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default Home;
