import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import ForgotPasswordPage from './components/ForgotPasswordPage.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"",
        element: <Home />
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/signup",
        element: <Signup />
      },
      {
        path:"/forgotPasswordPage",
        element:<ForgotPasswordPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)
