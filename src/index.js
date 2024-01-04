import app from "./app.js";
import { connection } from "./db/connection.js";

connection().then(()=>{
    app.listen(3000,()=>{
        console.log("Live on : http://localhost:3000")
    })
})