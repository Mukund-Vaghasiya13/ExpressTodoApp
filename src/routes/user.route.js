import { Router } from "express";
import { Login, RegisterUser } from "../controller/user.controller.js";

const router = Router()

router.route("/register").post(
    RegisterUser
)

router.route("/login").post(
    Login
)

export{
    router
}