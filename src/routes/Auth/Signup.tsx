import { useReducer, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../helpers/useAuth";

interface SignUpUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const formReducer = (state: SignUpUser, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const initialUserState = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function Signup() {
  const auth = useAuth();
  const [formData, setFormData] = useReducer(formReducer, initialUserState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, passwordConfirm } = formData;
    if (!name.trim() || !email.trim() || !password || !passwordConfirm) {
      return alert("Please fill in all fields");
    }

    if (password !== passwordConfirm) {
      return alert("Passwords do not match");
    }

    const isSuccess = await auth.signup(name, email, password);
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
        <p className='text-text uppercase text-center mb-4'>Sign Up</p>
        <label htmlFor='name'>
          <input
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Name'
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={setFormData}
          />
        </label>
        {/* <label htmlFor='username'>
          <input
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='User Name'
            type='text'
            name='username'
            id='username'
            value={formData.username}
            onChange={setFormData}
          />
        </label> */}
        <label htmlFor='email'>
          <input
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Email'
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={setFormData}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Password'
            name='password'
            id='password'
            value={formData.password}
            onChange={setFormData}
          />
        </label>
        <label htmlFor='passwordConfirm'>
          <input
            type='password'
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='ConfirmPassword'
            name='passwordConfirm'
            id='passwordConfirm'
            value={formData.passwordConfirm}
            onChange={setFormData}
          />
        </label>
        <button
          type='submit'
          className='bg-primary text-light py-2 rounded-full'
        >
          {loading ? "Please wait..." : "Sign Up"}
        </button>
      </form>
      <p className='text-xs mt-2 text-text'>
        Do not have an account?{" "}
        <Link to='/signin' className='text-primary underline cursor-pointer'>
          Sign In Here
        </Link>
      </p>
    </div>
  );
}

export default Signup;
