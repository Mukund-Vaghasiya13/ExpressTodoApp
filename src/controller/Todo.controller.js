import { User } from "../modles/user.modle.js";
import { Todo } from "../modles/todo.modles.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponseHnadler } from "../utils/apiResponseHandler.js";

const isUserLofgInOrNot = async (user)=>{
    if(!user){
        throw new ApiError(400,"User is not authorized")
    }
    
    const newUser = await User.findById(user._id).select("-password")
    
    if(!newUser){
        throw new ApiError(400,"User is not vaild or not Found")
    }

    return newUser.id
}

const addTodo = asyncHandler(async (req,res)=>{
   const user = req.user
   const {todo} = req.body

   const ID = await isUserLofgInOrNot(user._id)

   const addedTask = await Todo.create({
        refId: ID,
        todo
   })

   if(!addedTask){
    throw new ApiError(400,"Problem in adding Todo")
   }

   res.status(201).json(
    new ApiResponseHnadler(201,null,"Todo added",true)
   )
})


const deleteTodo = asyncHandler( async (req,res)=>{
    const user = req.user
    const {TodoID} = req.body

    const ID = await isUserLofgInOrNot(user._id)

    const DeleteTodo = await Todo.findByIdAndDelete(TodoID)

    if(!DeleteTodo){
        throw new ApiError(400,"Not able to delete",false)
    }

    res.status(200).json(
        new ApiResponseHnadler(200,null,"Deleted",true)
    )
})

export{
    addTodo
}