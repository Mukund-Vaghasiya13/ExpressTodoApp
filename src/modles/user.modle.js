import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    next()
    
})

userSchema.methods.checkPassIsCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genarateAccessToken = function(data){
    return jwt.sign({
        _id:data._id,
        username:data.username,
    }, 'mukundvaghasiya')
}

export const User = new mongoose.model("User",userSchema,"users")