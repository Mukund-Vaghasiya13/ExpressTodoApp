import express from "express";
import { router } from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import TodoRoute from "./routes/todo.route.js";
import cors from "cors"

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// Routes

app.use("/api/todo/v1",router)
app.use("/api/todo/v1/Todos",TodoRoute)

app.get("/helper",(req,res)=>{
    res.send("👻👻👻👻👻")
})

export default app
