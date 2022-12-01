import express from "express";
import {
  search,
  watch,
  edit,
  remove,
  comments,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/remove", remove);
videoRouter.get("/:id(\\d+)/comments", comments);

export default videoRouter;
