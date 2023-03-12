import express from "express";
import {
  getEdit,
  getUpload,
  postEdit,
  postUpload,
  remove,
  watch,
} from "../controllers/videoControllers";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();
const mongoID = "[0-9a-zA-Z]{24}";

videoRouter.route(`/:id(${mongoID})`).get(watch);
videoRouter
  .route("/upload")
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);
videoRouter.route(`/:id(${mongoID})/edit`).get(getEdit).post(postEdit);
videoRouter.route(`/:id(${mongoID})/remove`).get(remove);
videoRouter.route(`/:id(${mongoID})/comments`);

export default videoRouter;
