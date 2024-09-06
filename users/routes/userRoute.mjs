import express from "express"
import {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.mjs"

const userRoute = express.Router()

userRoute.post("/create-user/", createUser)
userRoute.get("/all-users", getAllUser)
userRoute.get("/get-user/:id", getUserById)
userRoute.put("/update-user/:id", updateUser)
userRoute.delete("/delete-user/:id", deleteUser)

export default userRoute
