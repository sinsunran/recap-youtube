import express from "express";
import { home, search } from "../controllers/videoControllers";
import {
  postJoin,
  getJoin,
  getLogin,
  postLogin,
} from "../controllers/userControllers";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").get(home);
rootRouter.route("/search").get(search);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);

export default rootRouter;
