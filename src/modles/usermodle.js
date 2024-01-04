import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


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

schema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    next()
    
})

export const User = new mongoose.model("User",schema,"users")