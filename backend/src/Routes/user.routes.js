import {Router} from "express"
import { changepass, googleLogin, loginUser, logoutUser, OTPSend, OTPVerify, registerUser } from "../Controllers/user.controller.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js"
import passport from "passport"
import { upload } from "../Middlewares/multer.middleware.js"



const router = Router()


/* Route for register*/
router.post('/register',upload.fields([
    {
        name: "avatar"
    }
]), registerUser)


/* Route for login*/
router.post('/login',loginUser)


/* Route for logout*/
router.post('/logout', verifyJWT, logoutUser)

/* Route for google sign in */
router.get('/google', passport.authenticate('google',{
    scope:['profile','email'],
    session:false
}))
router.get('/google/redirect', passport.authenticate('google',{session:false}),googleLogin)


/* OTP sending via email */
router.post('/otpsend',OTPSend)

/* OTP verification */
router.post('/otpverify',OTPVerify)

/* Change password */
router.post("/changepass",changepass)






export default router