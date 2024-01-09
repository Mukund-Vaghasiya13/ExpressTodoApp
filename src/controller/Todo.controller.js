import { User } from "../modles/user.modle.js";
import { Todo } from "../modles/todo.modles.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponseHnadler } from "../utils/apiResponseHandler.js";



const addTodo = asyncHandler(async (req,res)=>{
   const user = req.user
   const {todo} = req.body

   if(!user){
    throw new ApiError(400,"User is not authorized")
   }

   const newUser = await User.findById(user._id).select("-password")

   if(!newUser){
    throw new ApiError(400,"User is not vaild or not Found")
   }

   const addedTask = await Todo.create({
        refId: newUser._id,
        todo
   })

   if(!addedTask){
    throw new ApiError(400,"Problem in adding Todo")
   }

   res.status(201).json(
    new ApiResponseHnadler(201,null,"Todo added",true)
   )
})


export{
    addTodo
}