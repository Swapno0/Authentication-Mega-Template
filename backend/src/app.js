import express from "express"
import cors from "cors"
import { errorHandler } from "./Middlewares/errorHandler.middleware.js"
import cookieParser from "cookie-parser"
import passportSetup from "./Utils/passport_setup.js"
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import session from "express-session"



// All the middlewares except one.
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors({
    origin: process.env.REACT_FRONTEND_URI,
    credentials: true
}))
app.use(cookieParser())
app.use(
  session({
    secret: "super_secret_key",   // change in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5 * 60 * 1000,   // OTP expires in 5 minutes
      httpOnly: true,          // safer: not accessible from JS
      secure: false            // true if using HTTPS
    }
  })
)





/*<<<<<---------------------------------------------------------------------------------------------------------------------------------->>>>>*/
/* imports router from routes.*/
import dummyRouter from "./Routes/dummy.routes.js"
import userRouter from "./Routes/user.routes.js"



/* Sends to appropriate router.*/
app.use("/", dummyRouter)
app.use("/user", userRouter)


/*<<<<<---------------------------------------------------------------------------------------------------------------------------------->>>>>*/




// The last middleware.
app.use(errorHandler)


export { app }