import { pool } from "../index.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { uploader } from "../Utils/Cloudinary.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ApiResponse } from "../Utils/ApiResponse.js";
import { OTPVerificationMail } from "../Utils/mail.js";



const generateAccessToken = function(email) {
    return jwt.sign(
        {
            email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateOTP = ()=> {
    let otp = ""
    let number = "0123456789"
    for (let index = 0; index < 6; index++) otp += number[Math.floor(Math.random()*(number.length-1))]

    return otp
}




const registerUser = asyncHandler(async (req,res) => {

    // // take data from frontend
    const {username,email,password} = req.body

    // validate required field
    if (username === "" ) throw new ApiError(400,"Username is required")
    if (email === "") throw new ApiError(400,"Email is required")
    if (password === "") throw new ApiError(400,"Password is required")
    
    // // check existed user
    const sql = `SELECT * FROM spotify.users
                WHERE email = $1`
    const parameters = [email]
    const existedUser = await pool.query(sql,parameters)
    if (existedUser.rows.length != 0) throw new ApiError(409,"An user already exists with the same EMAIL")

    // // take files (avatar,coverphoto etc)
    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) throw new ApiError(400,"Avatar is required")

    // // upload the files to cloudinary
    const avatar = await uploader(avatarLocalPath)

    // // encrypt password
    const hashPassword = await bcrypt.hash(password,6)

    // save user to database SCHEMA.
    const sql2 = `INSERT INTO spotify.users (username,email,password,avatar)
                VALUES($1,$2,$3,$4)`
    const parameters2 = [username,email,hashPassword,avatar.url]
    const user = await pool.query(sql2,parameters2)
    

    // check whether user was saved or not
    const sql3 = `SELECT USERNAME,EMAIL,avatar FROM spotify.users
                WHERE email = $1`
    const parameters3 = [email]
    const loggedInUser = await pool.query(sql3,parameters3)


    // generate token
    const token = generateAccessToken(email)
    const options = {
        httpOnly: true,
        secure: true
    }

    // send token to cookie after deleting existing cookie
    res
    .cookie("token",token,options)
    .json(new ApiResponse(200,loggedInUser.rows[0],"User registered successfully"))
})



const loginUser = asyncHandler(async (req,res) => {
    // take data from frontend
    const {email,password} = req.body

    // validate required field
    if (email === "") throw new ApiError(400,"Email is required")
    if (password === "") throw new ApiError(400,"Password is required")

    // check user
    const sql = `SELECT * FROM spotify.users
                WHERE email = $1`
    const parameters = [email]
    const existedUser = await pool.query(sql,parameters)
    if (existedUser.rows.length == 0) throw new ApiError(409,"User does not exist")

    // check password
    const isPasswordValid = await bcrypt.compare(password,existedUser.rows[0].password)
    if (!isPasswordValid) throw new ApiError(401,"Invalid User Credentials")

    // bring data of user without some columns
    const sql2 = `SELECT USERNAME,EMAIL,avatar FROM spotify.users
                WHERE email = $1`
    const parameters2 = [email]
    const loggedInUser = await pool.query(sql2,parameters2)
    

    // generate token
    const token = generateAccessToken(email)
    const options = {
        httpOnly: true,
        secure: true
    }

    // send token to cookie
    res
    .cookie("token",token,options)
    .json(new ApiResponse(200,loggedInUser.rows[0],"User logged in successfully"))
})




const logoutUser = asyncHandler(async (req,res) => {
    // clear the cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .clearCookie("token",options)
    .json(new ApiResponse(200,{},"User logged out"))

})


const googleLogin = asyncHandler(async (req,res) => {
    // Take user info from req.user
    let savedUser = req.user

    // see if emailAlready exists or not.
    // YES, THIS WILL SHOW YOU A JSON RESPONSE, NOT YOUR FRONTEND. WHEN YOU REACH THIS JSON RESPONSE, JUST CLICK BACK OF BROWSER TO GO TO YOUR FRONTEND.
    if (savedUser.emailAlreadyExists) throw new ApiError(400,"User with this email already exists")

    // Generate Token.
    const token = generateAccessToken(savedUser.email)
    const options = {
        httpOnly: true,
        secure: true
    }

    // Send them to cookie.
    res
    .cookie("token",token,options)
    .redirect(process.env.REACT_FRONTEND_URI)
})


const githubLogin = asyncHandler(async (req,res) => {
    console.log(567)
    res.redirect(process.env.REACT_FRONTEND_URI)
})


const facebookLogin = asyncHandler(async (req,res) => {
    res.redirect(process.env.REACT_FRONTEND_URI)
})


const OTPSend = asyncHandler(async(req,res) => {
    const OTP = generateOTP()
    const response = await OTPVerificationMail(req.body.reciever,OTP)
    
    
    if(response==='EENVELOPE') throw new ApiError(400, "Invalid Email")
    else {
        //USING SESSION TO STORE OTP. NOT GOOD. THERE ARE BETTER WAYS
        req.session.otp = OTP
        req.session.email = req.body.reciever
        res.json(new ApiResponse(200,{},"OTP sent"))
    }
} )


const OTPVerify = asyncHandler(async(req,res)=> {
    const{email,otp} = req.body

    if(req.session.email===email && req.session.otp===otp) {
        req.session.destroy()
        res.json(new ApiResponse(200,{email},"OTP verification successful"))
    }    
    else throw new ApiError(400,"Invalid data")
})


const changepass = asyncHandler(async(req,res)=> {
    const{password,email} = req.body

    const hashPassword = await bcrypt.hash(password,6)

    let sql = `UPDATE spotify.users 
                SET PASSWORD = $1
                WHERE email = $2`
    let parameters = [hashPassword,email]
    let passChange = await pool.query(sql,parameters)

    res.json(new ApiResponse(200,{},"Password changed Successfully"))
    
})



export {registerUser,loginUser,logoutUser,googleLogin,githubLogin,facebookLogin,OTPSend,OTPVerify,changepass}






























