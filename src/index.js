import app from "./app.js";
import connection from "./db/db.connection.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Get Set Go 🚩")
    })
})