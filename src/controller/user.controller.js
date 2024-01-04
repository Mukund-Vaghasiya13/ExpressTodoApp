import { asyncHandler } from "../utils/AsyncHandler.js"
import { User } from "../modles/usermodle.js"
import { ApiError } from "../utils/apiErrorHandler.js"
import { ApiResponseHnadler } from "../utils/apiResponseHandler.js"

const RegisterUser = asyncHandler( async (req,res)=>{
    const {username , password} = req.body
    
    if([username,password].some((e)=> e == null)){
        throw new ApiError(400,"user details invalid",false)
    }

   const user = await User.create({
    username,
    password
   })

   if(!user){
        new ApiError(400,"user details invalid",false)
   }


   res.status(201).json(
    new ApiResponseHnadler(201,user,"user Created",true)
   )
})



export {
    RegisterUser
}