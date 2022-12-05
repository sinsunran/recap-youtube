import express from "express";
import { search, home } from "../controllers/videoControllers";
import { join, login } from "../controllers/usercontrollers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/search", search);
globalRouter.get("/login", login);
globalRouter.get("/join", join);

export default globalRouter;
