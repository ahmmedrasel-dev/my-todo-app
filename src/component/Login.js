import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
const Login = () => {

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    hookError,
  ] = useSignInWithEmailAndPassword(auth);

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  // Sign In with Email And Password 
  const handleSubmit = async e => {
    e.preventDefault()
    if (email.length !== 0 && password.length) {
      await signInWithEmailAndPassword(email, password)
    } else {
      toast.error('Email & Password is empaty.')
    }
  }

  if (user) {
    navigate(from, { replace: true });
    toast.success('User Login Successfullay');
  }

  useEffect(() => {
    if (hookError) {
      toast.error(hookError.message)
    }
  }, [hookError])


  return (
    <div className='md:p-20'>
      <div className='md:w-2/6 sm:w-4/6 md:h-82 md:mx-auto flex flex-col justify-center bg-slate-100 border-2 rounded-3xl'>
        <div className='text-center my-8'>
          <h2 className='text-4xl text-cyan-500'>My Todo App</h2>
          <p className=''>Please login with your email and Password.</p>
        </div>

        <form className='sm:w-4/4 md:w-3/4 mx-auto mt-4' onSubmit={handleSubmit}>
          <input className='block w-full p-3 rounded-md text-xl' type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <input className='block w-full p-3 my-4 rounded-md text-xl' type="password" placeholder='Password' onBlur={(e) => setPassword(e.target.value)} />
          <button className='w-full bg-sky-500 p-3 mb-4 rounded-md text-xl text-white'>Login</button>

          <p className='text-center mb-4'>Don't have Account? <Link className='underline text-blue-400' to='/register'>Create an account.</Link></p>

        </form>
      </div>
    </div>
  );
};

export default Login;