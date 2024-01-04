import mongoose from "mongoose";

const schema = new mongoose.Schema({
    usename:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    }
},{
    timestamps:true
})

export const User = new mongoose.model("User",schema,"users")