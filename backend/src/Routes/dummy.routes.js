import {Router} from "express"
import { getInfo, output1, output2 } from "../Controllers/dummy.controller.js"
import { verifyJWT } from "../Middlewares/auth.middleware.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"



const router = Router()

router.get("/",(req,res)=> {
  res.json("This is a new message")
})


/* Route for dummy api 1*/
router.get('/dummy1',output1)


/* Route for dummy api 2*/
router.get('/dummy2',output2)


router.get('/authTest',verifyJWT,(req,res)=>{
    try {
        res.json(new ApiResponse(201,{},"hehe"))
    } catch (error) {
      throw new ApiError(500,"Bad request, very bad")  
    }
})

router.get("/getInfo",verifyJWT,getInfo)






export default router