import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const server = import.meta.env.VITE_BACKEND

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm()

  const [backendErrorMessage, setBackendErrorMessage] = useState("")
  const [otpVerification, setOtpVerification] = useState(false)
  const [email,setEmail] = useState("")

  const navigate = useNavigate()


  const submitFunc = async (data) => {
    const allData = { email: data.email, otp: data.otp }
    let response = await fetch(`${server}/user/otpverify`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(allData),
      credentials: "include"
    })
    let r = await response.json()
    console.log(r)

    if (r.success ) {
      setOtpVerification(true)
      setEmail(r.data.email)
    } 
    else setBackendErrorMessage(r.message)
  }


  const sendOTP = async () => {
    let reciever = document.getElementsByName('email')[0].value
    let allData = { reciever }

    const response = await fetch(`${server}/user/otpsend`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(allData),
      credentials: "include"
    })
    const r = await response.json()

    if (!r.success) setBackendErrorMessage(r.message)
  }


  const changePass = async(data) => {
    const allData = {password:data.password,email:email}
    const response = await fetch(`${server}/user/changepass`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(allData),
      credentials: "include"
    })
    const r = await response.json()
    console.log(r)

    if(r.success) navigate('/login')
  }





  return (
    <>
      <div className='w-max mx-auto flex flex-col items-center'>
        <div className='border-2 border-s-black p-5 mt-12'>
          {otpVerification ?
            <div>
              <form className='flex flex-col gap-2 mt-5 items-center' action="" onSubmit={handleSubmit(changePass)}>

                <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="text" placeholder='New Password' {...register("password", {
                  required: { value: true, message: "New Password is required" }
                })}
                />
                <button className=' w-30 p-3 rounded-3xl bg-pink-500 hover:bg-pink-600 font-bold cursor-pointer' disabled={isSubmitting} type='submit'> Submit </button>
              </form>
              {errors.password && <div>{errors.password.message}</div>}
            </div>
            :
            <div >
              <div className='text-center'>OTP Verification</div>

              {backendErrorMessage && <div className='text-red-600'>{backendErrorMessage}</div>}
              <form className='flex flex-col gap-2 mt-5 items-center' action="" onSubmit={handleSubmit(submitFunc)}>

                <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="text" placeholder='email' {...register("email", {
                  required: { value: true, message: "Email is required" }
                })}
                />

                <input className='bg-gray-500 text-black border-none outline-none px-2 py-3 rounded-md' type="text" placeholder='OTP' {...register("otp", {
                  required: { value: true, message: "OTP is required" }
                })}
                />
                <button className=' w-30 p-3 rounded-3xl bg-pink-500 hover:bg-pink-600 font-bold cursor-pointer' disabled={isSubmitting} type='submit'> Submit </button>
              </form>
              {errors.email && <div>{errors.email.message}</div>}
              {errors.otp && <div>{errors.otp.message}</div>}
            </div>
          }
        </div>
        {otpVerification ? "":<button onClick={sendOTP} className=' w-30 p-3 mt-5 rounded-3xl bg-purple-500 hover:bg-purple-600 font-bold cursor-pointer'> Send OTP </button>}
          
      </div>
    </>
  )
}

export default ForgotPasswordPage