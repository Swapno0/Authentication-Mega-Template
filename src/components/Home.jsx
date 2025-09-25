import React, { useEffect, useState } from 'react'




function Home() {
  const server = import.meta.env.VITE_BACKEND

  const [data,setData] = useState([])

  const getInfo = async()=> {
    const response = await fetch(`${server}/getInfo`,{
      credentials: "include"
    })
    const r = await response.json()
    // console.log(r)
    setData(r.data)
  }

  useEffect(()=>{
    getInfo()
  },[])


  return (
    <>
    <div className='w-max mx-auto mt-20'>
      {data?
      <button>
        <img src={data?.avatar} alt="" width="250px" height="250px"/>
        <div className='mt-5 p-5  bg-orange-400 rounded-3xl flex flex-col gap-5'>
          <div>{data?.username}</div>
          <div>{data?.email}</div>
        </div>
      </button> 
      :
      <div>You need to login first to use your dashboard</div>
    }
    </div>
    </>
  )
}

export default Home