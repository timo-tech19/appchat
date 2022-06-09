import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Welcome to AppChat</h1>
      <nav>
        <Link to='signup'>Sign up</Link>
      </nav>
    </main>
  );
}

export default Home;
