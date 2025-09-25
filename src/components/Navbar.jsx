import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const server = import.meta.env.VITE_BACKEND
  const navigate = useNavigate()
  
    const [isLoggedIn,setIsLoggedIn] = useState(false)
  
    const getInfo = async()=> {
      const response = await fetch(`${server}/getInfo`,{
        credentials: "include"
      })
      const r = await response.json()
      console.log(r)
      setIsLoggedIn(r.success)
    }
  
    useEffect(()=>{
      getInfo()
    },)


    const logout = async ()=> {
      const response = await fetch(`${server}/user/logout`,{
        method:"POST",
        credentials: "include"
      })
      const r = await response.json()
      setIsLoggedIn(false)
      navigate('/login')
    }





  return (
    <>
    <div className="flex justify-around items-center h-20 bg-pink-500">
      <div className="logo p-3">OAuth Tester</div>
      <div className="routes">
        <ul className='flex gap-4 items-center '>
          <li><Link className="" to={'/'}>Home</Link></li>
          <li>{isLoggedIn?<button onClick={logout} className='bg-violet-500 p-4 rounded-3xl cursor-pointer'>Logout</button> : <div className='flex'>
            <div className='mr-4'><Link className="" to={'/login'}>Login</Link></div>
            <div><Link className="" to={'/signup'}>SignUp</Link></div>
          </div> }</li>
          <div>{isLoggedIn.data}</div>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navbar