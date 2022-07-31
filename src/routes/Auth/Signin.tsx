import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../helpers/useAuth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      return alert("Please fill in all fields");
    }

    const isSuccess = await auth.signin(email, password);
    setLoading(false);
    if (isSuccess) navigate("/");
  };

  return (
    <div className='bg-light p-5 rounded-xl shadow-xl bg-opacity-70 w-[350px]'>
      <h3 className='text-text text-center'>Welcome to</h3>
      <h1 className='text-3xl text-center my-4'>
        <span>App</span>
        <span className='text-primary'>Chat</span>
      </h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <p className='text-text uppercase text-center mb-4'>Sign In</p>
        <label htmlFor='email'>
          <input
            className='mb-6 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Email'
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            className='mb-6 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type='submit'
          className='bg-primary text-light py-2 rounded-full'
        >
          {loading ? "Please wait..." : "Sign In"}
        </button>
      </form>
      <p className='text-xs mt-2 text-text'>
        Do not have an account?{" "}
        <Link to='/signup' className='text-primary underline cursor-pointer'>
          Sign Up Here
        </Link>
      </p>
      <p className='text-xs mt-2'>
        Demo account - email: test@example.com password: test1234
      </p>
    </div>
  );
}

export default Signin;
