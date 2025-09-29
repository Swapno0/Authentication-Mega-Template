import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

const server = import.meta.env.VITE_BACKEND

function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()


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

    if (r.success) navigate('/')
    else {
      // setBackendErrorMessage(r.message)
      const msgShow = () => toast.error(r.message)
      msgShow()
    }


  }





  return (
    <>
      <ToastContainer className='mt-20'
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        type="error"
        theme='dark'
      />
      <div className='w-max mx-auto flex flex-col'>
        {isSubmitting && <span className="loading loading-dots loading-xl"></span>}
        <form className='mt-14' action="" onSubmit={handleSubmit(submitFunc)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Sign Up</legend>


            <label className="label">Username</label>
            <input className='input' type="text" placeholder='username' {...register("username", {
              required: { value: true, message: "Username is required" },
              maxLength: { value: 15, message: "Too long" }
            })}
            />


            <label className="label">Email</label>
            <input className='input' type="email" placeholder='email' {...register("email", {
              required: { value: true, message: "Email is required" }
            })}
            />


            <label className="label">Password</label>
            <input className='input' type="password" placeholder='password' {...register("password", {
              required: { value: true, message: "Password is required" }
            })}
            />


            <fieldset className="fieldset">
              <legend className="fieldset-legend">Pick a file</legend>
              <input className='file-input' type="file" placeholder='avatar' {...register("avatar", {
                required: { value: true, message: "Avatar is required" }
              })}
              />
              <label className="label">Max size 2MB</label>
            </fieldset>



            <button className='btn btn-neutral mt-4' disabled={isSubmitting} type='submit'> Submit </button>

          </fieldset>
          {errors.username && <div className='text-red-700'>*{errors.username.message}</div>}
          {errors.email && <div className='text-red-700'>*{errors.email.message}</div>}
          {errors.password && <div className='text-red-700'>*{errors.password.message}</div>}
        </form>
      </div>
    </>
  )
}

export default Signup