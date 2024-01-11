import { GetTodos, UpdateTodo, addTodo, deleteTodo } from "../controller/Todo.controller.js";
import { Router } from "express";
import { UserAuthOrNot } from "../middleware/isUserAuthOrNot.js";

const router = Router()


router.route("/todo/add").post(
    UserAuthOrNot,
    addTodo
)

router.route("/todo/delete").post(
    UserAuthOrNot,
    deleteTodo
)

router.route("/todo/update").post(
    UserAuthOrNot,
    UpdateTodo
)

router.route("/todo/gettodo").get(
    UserAuthOrNot,
    GetTodos
)

export default router