import mongoose from "mongoose";

const connection = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://Mukund:8320017126@cluster0.vn1ihop.mongodb.net/",{
            dbName:"Todo"
        })
    }catch{
        console.log("Connection error😡")
    }
}

export default connection