import express from "express";
import { remove, update } from "../controllers/usercontrollers";

const userRouter = express.Router();

userRouter.get("/remove", remove);
userRouter.get("/update", update);

export default userRouter;
