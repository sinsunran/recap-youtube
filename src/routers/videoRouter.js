import express from "express";
import {
  upload,
  comment,
  watch,
  remove,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id/remove", remove);
videoRouter.get("/:id/watch", watch);
videoRouter.get("/:id/comment", comment);

export default videoRouter;
