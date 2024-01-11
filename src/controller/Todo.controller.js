import { User } from "../modles/user.modle.js";
import { Todo } from "../modles/todo.modles.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import { ApiResponseHnadler } from "../utils/apiResponseHandler.js";
import { Types } from "mongoose";

const isUserLofgInOrNot = async (user)=>{
    if(!user){
        throw new ApiError(400,"User is not authorized")
    }
    // console.log(user)
    const newUser = await User.findById(user).select("-password")
    // console.log(newUser)
    if(!newUser){
        throw new ApiError(400,"User is not vaild or not Found")
    }

    return newUser.id
}

const addTodo = asyncHandler(async (req,res)=>{
   const user = req.user
   const {todo} = req.body
    // console.log(user)
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

    if(!TodoID){
        throw new ApiError(400,"Inavlid todo",false)
    }

    const DeleteTodo = await Todo.findByIdAndDelete(TodoID)

    if(!DeleteTodo){
        throw new ApiError(400,"Not able to delete",false)
    }

    res.status(200).json(
        new ApiResponseHnadler(200,null,"Deleted",true)
    )
})

const UpdateTodo = asyncHandler(async (req,res)=>{
    const user = req.user
    const {todo,TodoID} = req.body

    const ID = await isUserLofgInOrNot(user._id)

    if(!TodoID || !todo){
        throw new ApiError(400,"Inavlid todo",false)
    }

    const UpdatedTodo = await Todo.findByIdAndUpdate(TodoID,{
        $set:{
            todo:todo
        }
    },{new:true})


    if(!UpdateTodo){
        throw new ApiError(400,"Updating Problem",false)
    }

    res.status(201).json(
        new ApiResponseHnadler(201,null,"Update Success",true)
    )
})

const GetTodos = asyncHandler(async(req,res)=>{
    const user = req.user
    const ID = await isUserLofgInOrNot(user._id)
    console.log(ID)
    const JoinData = await User.aggregate([
        {
            //In Todo match Login Id with docs
            $match:{
                _id: new Types.ObjectId(ID)
            }
        },{
            // lookup from useres becaus i want to join user to todo 
            $lookup:{
                from:"todos",
                localField: "_id",
                foreignField: "refId",
                as:"Todo"
            }
        },{
            $addFields:{
                Todo:{
                    $first:"$Todo"
                }
            }
        }
    ])

    console.log(JoinData)
    res.status(200).json({"ok":"aggri"})
})

export{
    addTodo,
    deleteTodo,
    UpdateTodo,
    GetTodos
}