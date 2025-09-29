import React, { useEffect, useState } from 'react'
import ThemeChangerBar from './ui/theme-changer-bar'




function Home() {
  const server = import.meta.env.VITE_BACKEND

  const [data, setData] = useState(null)

  const getInfo = async () => {
    const response = await fetch(`${server}/getInfo`, {
      credentials: "include"
    })
    const r = await response.json()
    // console.log(r)
    setData(r.data)
  }

  useEffect(() => {
    getInfo()
  }, [])


  return (
    <>
      <div className='w-max mx-auto mt-20 flex flex-col gap-5'>
        {data ?
          <>
            <button>
              <img src={data?.avatar} alt="" width="250px" height="250px" />
              <div className='mt-5 p-5  bg-orange-400 rounded-3xl flex flex-col gap-5'>
                <div>{data?.username}</div>
                <div>{data?.email}</div>
              </div>
            </button>
            <button className="btn btn-info">Default</button>
          </>
          :
          <>
          <div>You need to login first to use your dashboard</div>
          </>
        }

        <ThemeChangerBar />
      </div>
    </>
  )
}

export default Home