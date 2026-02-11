import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/POST/signup',userController.registerUser);
userRouter.post('/POST/signin',userController.LoginUser);

export default userRouter;