import React, { useState } from 'react'
import Home from './Home.jsx'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link, NavLink } from 'react-router-dom'

const server = import.meta.env.VITE_BACKEND

function Login() {

  const googleSigninHandler = async () => {
    window.location.href = `${server}/user/google`
  }
  const githubSigninHandler = async () => {
    window.location.href = `${server}/user/github`
  }
  const facebookSigninHandler = async () => {
    window.location.href = `${server}/user/facebook`
  }

  const [backendErrorMessage, setBackendErrorMessage] = useState("")

  const navigate = useNavigate()


  const submitFunc = async (data) => {
    let allData = {email:data.email, password:data.password}

    let response = await fetch(`${server}/user/login`, {
      method: "POST",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(allData),
      credentials: "include"
    })
    let r = await response.json()

    if (r.success) navigate('/')
    else setBackendErrorMessage(r.message)
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()




  return (
    <>
      <div className='w-max mx-auto flex flex-col'>
        <button onClick={googleSigninHandler} className='mt-16 bg-blue-400 text-white p-2 rounded-md shadow-blue-200 hover:bg-blue-500 cursor-pointer transform transition-transform duration-500 ease-in-out hover:-translate-y-1'>Sign In Using Google</button>
        <button onClick={githubSigninHandler} className='mt-4 bg-black text-white p-2 rounded-md shadow-blue-200 cursor-pointer transform transition-transform duration-500 ease-in-out hover:-translate-y-1'>Sign In Using GitHub</button>
        <button onClick={facebookSigninHandler} className='mt-4 bg-blue-800 text-white p-2 rounded-md shadow-blue-200 hover:bg-blue-900 cursor-pointer transform transition-transform duration-500 ease-in-out hover:-translate-y-1'>Sign In Using FaceBook</button>

        <div className='border-2 border-s-black p-5 mt-12'>
          <div className='text-center'>Login via email</div>
          {isSubmitting && <div>Loading...</div> }
          {backendErrorMessage && <div className='text-red-600'>{backendErrorMessage}</div> }
          <form className='flex flex-col gap-2 mt-5 items-center' action="" onSubmit={handleSubmit(submitFunc)}>
            <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="text" placeholder='email' {...register("email", {
              required: { value: true, message: "Email is required" }
            })}
            />

            <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="password" placeholder='password' {...register("password", {
              required: { value: true, message: "Password is required" }
            })}
            />

            <button className=' w-30 p-3 rounded-3xl bg-pink-500 hover:bg-pink-600 font-bold cursor-pointer' disabled={isSubmitting} type='submit'> Submit </button>

          </form>
          {errors.email && <div className='text-red-700'>*{errors.email.message}</div>}
          {errors.password && <div className='text-red-700'>*{errors.password.message}</div>}
        </div>
        <div className=' mr-0 ml-auto'>
          <Link to={'/forgotPasswordPage'} className='w-max px-1 mt-1 hover:text-blue-900 cursor-pointer'>Forgot Password</Link>
        </div>
      </div>

    </>
  )
}

export default Login