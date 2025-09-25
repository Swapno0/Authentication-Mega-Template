import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const server = import.meta.env.VITE_BACKEND

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()

  const [backendErrorMessage, setBackendErrorMessage] = useState("")

  const navigate = useNavigate()


  const submitFunc = async (data) => {
    const allData = new FormData()
    allData.append('username', data.username)
    allData.append('email', data.email)
    allData.append('avatar', data.avatar[0])
    allData.append('password', data.password)
    let response = await fetch(`${server}/user/register`, {
      method: "POST",
      body: allData,
      credentials: "include"
    })
    let r = await response.json()

    if(r.success) navigate('/')
    else setBackendErrorMessage(r.message)
  }





  return (
    <>
      <div className='w-max mx-auto flex flex-col'>
        <div className='border-2 border-s-black p-5 mt-12'>
          <div className='text-center'>SignUp Form</div>
          {isSubmitting && <div>Loading...</div> }
          {backendErrorMessage && <div className='text-red-600'>{backendErrorMessage}</div> }
          <form className='flex flex-col gap-2 mt-5 items-center' action="" onSubmit={handleSubmit(submitFunc)}>
            <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="text" placeholder='username' {...register("username", {
              required: { value: true, message: "Username is required" },
              maxLength: { value: 15, message: "Too long" }
            })}
            />

            <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="text" placeholder='email' {...register("email", {
              required: { value: true, message: "Email is required" }
            })}
            />

            <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="password" placeholder='password' {...register("password", {
              required: { value: true, message: "Password is required" }
            })}
            />

            <input className=' bg-gray-500 text-black border-none outline-none px-2 py-2 rounded-md' type="file" placeholder='avatar' {...register("avatar", {
              required: { value: true, message: "Avatar is required" }
            })}
            />

            <button className=' w-30 p-3 rounded-3xl bg-pink-500 hover:bg-pink-600 font-bold cursor-pointer' disabled={isSubmitting} type='submit'> Submit </button>

          </form>
          {errors.username && <div className='text-red-700'>*{errors.username.message}</div>}
          {errors.email && <div className='text-red-700'>*{errors.email.message}</div>}
          {errors.password && <div className='text-red-700'>*{errors.password.message}</div>}
        </div>
      </div>
    </>
  )
}

export default Signup