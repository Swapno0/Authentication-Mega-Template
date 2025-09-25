
import { pool } from "../index.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,res,next) => {
    // take token from cookies of the browser
    const token = req.cookies?.token

    // validate required token
    if(!token) throw new ApiError(401,"Unauthorized request")

    // decode token
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    // check user
    const sql = `SELECT username,email,avatar FROM spotify.users
                WHERE email = $1`
    const parameters = [decodedToken.email]
    const checkUser = await pool.query(sql,parameters)

    // validate user
    if(checkUser.rows.length == 0) throw new ApiError(401,"Invalid Access Token")

    // what to do next
    req.user = checkUser.rows[0]
    next()
})