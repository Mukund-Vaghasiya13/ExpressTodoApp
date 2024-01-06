import { Router } from "express";
import { Login, Logout, RegisterUser } from "../controller/user.controller.js";
import { UserAuthOrNot } from "../middleware/isUserAuthOrNot.js";
const router = Router()

router.route("/register").post(
    RegisterUser
)

router.route("/login").post(
    Login
)

router.route("/logout").post(
    UserAuthOrNot,
    Logout
)

export{
    router
}