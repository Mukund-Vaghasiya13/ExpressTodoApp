import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";

const UserAuthOrNot = asyncHandler((req,res,next)=>{
    try{
        const token = req.header("Authorization")?.replace("Bearer ","") || req.cookies.AccessToken
        if(!token){
            console.log("No token")
            next()
        }

        const user = jwt.verify(token,"mukundvaghasiya")

        req.user = user
        next()

    }catch{
        console("Error in user authornot")
    }
})

export {
    UserAuthOrNot
}