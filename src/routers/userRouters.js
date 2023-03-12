import express from "express";
import {
  logout,
  finishGitHubLogin,
  startGitHubLogin,
  getEdit,
  postEdit,
  getPassword,
  postPassword,
} from "../controllers/userControllers";
import {
  loginOnlyMiddleware,
  publicOnlyMiddleware,
  uploadAvatar,
} from "../middlewares";

const userRouter = express.Router();

userRouter.route("/profile");
userRouter.route("/change-password").get(getPassword).post(postPassword);
userRouter
  .route("/edit")
  .all(loginOnlyMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);
userRouter.route("/logout").all(loginOnlyMiddleware).get(logout);
userRouter
  .route("/github/start")
  .all(publicOnlyMiddleware)
  .get(startGitHubLogin);
userRouter
  .route("/github/finish")
  .all(publicOnlyMiddleware)
  .get(finishGitHubLogin);

export default userRouter;
