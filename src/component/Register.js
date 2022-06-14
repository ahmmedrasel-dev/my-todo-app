import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const Register = () => {
  let navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [registerError, setRegisterError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [
    createUserWithEmailAndPassword,
    user,
    hookError,
  ] = useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: true
  });

  const handleName = event => {
    const name = event.target.value;
    if (name !== null) {
      setRegisterInfo({ ...registerInfo, name: event.target.value })
      setRegisterError({ ...registerError, name: '' })
    } else {
      setRegisterError({ ...registerError, name: 'Email is Required' })
      setRegisterInfo({ ...registerInfo, name: '' })
    }

  }

  const handleEmail = event => {
    const emailValidTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailValidTest.test(event.target.value);
    console.log(validEmail)
    if (validEmail) {
      setRegisterInfo({ ...registerInfo, email: event.target.value })
      setRegisterError({ ...registerError, email: '' })
    } else {
      setRegisterError({ ...registerError, email: 'Invalid Email.' })
      setRegisterInfo({ ...registerInfo, email: '' })
    }
  }

  const handlePassword = e => {
    const passwordTest = /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{8,16}$/;
    const strongPassword = passwordTest.test(e.target.value);
    if (strongPassword) {
      setRegisterInfo({ ...registerInfo, password: e.target.value })
      setRegisterError({ ...registerError, password: '' })
    } else {
      setRegisterError({ ...registerError, password: 'Your Passowrd is to week.' })
      setRegisterInfo({ ...registerInfo, password: '' })
    }
  }


  const handleComfirmPassword = e => {
    if (registerInfo.password !== e.target.value) {
      setRegisterError({ ...registerError, confirmPassword: 'Confirmation Password not Match.' })
    } else {
      setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })
      setRegisterError({ ...registerError, confirmPassword: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);
    await updateProfile({ displayName: registerInfo.name });
  }

  if (user) {
    navigate('/');
    toast.success('User Create Successfully.')
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
          <h2 className='text-4xl text-cyan-500'>My Todo-App</h2>
          <p className=''>User Register Form using Email & Password.</p>
        </div>

        <form className='sm:w-4/4 md:w-3/4 mx-auto mt-4' onSubmit={handleSubmit}>
          <input className='block w-full p-3 mb-4 rounded-md text-xl' type="text" placeholder='Name' onBlur={handleName} />

          {
            registerError?.email && <strong className='text-red-500'>{registerError.email}</strong>
          }

          <input className='block w-full p-3 rounded-md text-xl' type="email" name="" id="" placeholder='Email' onBlur={handleEmail} />

          {
            registerError?.email && <strong className='text-red-500'>{registerError.email}</strong>
          }

          <input className='block w-full p-3 my-4 rounded-md text-xl' type="password" name="" id="" placeholder='Password' onChange={handlePassword} />
          {
            registerError?.password && <strong className='text-red-500'>{registerError.password}</strong>
          }

          <input className='block w-full p-3 my-4 rounded-md text-xl' type="password" name="" id="" placeholder='Conformation Password' onChange={handleComfirmPassword} />

          {
            registerError?.confirmPassword && <strong className='text-red-500'>{registerError.confirmPassword}</strong>
          }

          <button className='w-full bg-sky-500 p-3 mb-4 rounded-md text-xl text-white'>Register</button>
          <p className='text-center mb-2'>Already Have an account? <Link className='underline text-blue-400' to='/login'>Login.</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;