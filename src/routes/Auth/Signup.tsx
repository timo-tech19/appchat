import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className='bg-light p-5 rounded-xl shadow-xl bg-opacity-70 w-[350px]'>
      <h3 className='text-text text-center'>Welcome to</h3>
      <h1 className='text-3xl text-center my-4'>
        <span>App</span>
        <span className='text-primary'>Chat</span>
      </h1>
      <form className='flex flex-col'>
        <p className='text-text uppercase text-center mb-4'>Sign Up</p>
        <label htmlFor='name'>
          <input
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Name'
            type='text'
            name='name'
            id='name'
          />
        </label>
        <label htmlFor='username'>
          <input
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='User Name'
            type='text'
            name='username'
            id='username'
          />
        </label>
        <label htmlFor='email'>
          <input
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Email'
            type='email'
            name='email'
            id='email'
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='Password'
            name='password'
            id='password'
          />
        </label>
        <label htmlFor='passwordConfirm'>
          <input
            type='password'
            className='mb-4 rounded-full px-4 py-2 w-full placeholder:text-sm'
            placeholder='ConfirmPassword'
            name='passwordConfirm'
            id='password'
          />
        </label>
        <button className='bg-primary text-light py-2 rounded-full'>
          Sign Up
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
