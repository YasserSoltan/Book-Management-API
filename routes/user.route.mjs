import expess from "express";
import * as userController from "../controllers/user.controller.mjs";
import userValidationSchemaMiddleware from "../middlewares/userValidationSchema.middleware.mjs";


const userRouter = expess.Router();
userRouter.post("/register", userValidationSchemaMiddleware() ,userController.register);
userRouter.post("/login", userValidationSchemaMiddleware(), userController.login);

export default userRouter;