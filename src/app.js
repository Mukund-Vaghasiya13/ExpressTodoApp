import express from "express";
import { router } from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// Routes

app.use("/api/todo/v1",router)


export default app