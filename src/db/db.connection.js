import mongoose from "mongoose";

const connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURL,{
            dbName:"Todo"
        })
    }catch{
        console.log("Connection error😡")
    }
}

export default connection