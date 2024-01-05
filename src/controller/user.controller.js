import { asyncHandler } from "../utils/AsyncHandler.js"
import { User } from "../modles/usermodle.js"
import { ApiError } from "../utils/apiErrorHandler.js"
import { ApiResponseHnadler } from "../utils/apiResponseHandler.js"

const RegisterUser = asyncHandler( async (req,res)=>{
    const {username , password} = req.body
    console.log(username)
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

const Login =  asyncHandler( async(req,res)=>{
    const {username,password} = req.body

    if(!username){
        throw new ApiError(400,"Username not valid",false)
    }

    const user =  await User.findOne({username})
    if(!user){
        throw new ApiError(400,"User not exist",false)
    }

    const passvalid =  await user.checkPassIsCorrect(password)

    if(!passvalid){
        throw new ApiError(400,"password invalid",false)
    }

    const token  = user.genarateAccessToken(user)

    if(!passvalid){
        throw new ApiError(400,"Server Problem",false)
    }

    //TODO: send Cookies
    res.status(200).json(
        new ApiResponseHnadler(200,{token},"Login successfull",true)
    )

})


export {
    RegisterUser,
    Login
}