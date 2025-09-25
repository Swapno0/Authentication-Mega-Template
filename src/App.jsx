import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

const server = import.meta.env.VITE_BACKEND

function App() {
  

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
