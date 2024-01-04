import express from "express";
import { router } from "./routes/user.route.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded())


// Routes

app.use("/api/todo/v1",router)


export default app