import express from "express";
import auth from "../../middlewares/auth.middleware.js";
import BookmarkController from "./bookmark.controller.js";

const bookmarkRouter = express.Router();
const bookmarkController = new BookmarkController();

bookmarkRouter.post("/POST/:id", auth, bookmarkController.toggleBookmark);

bookmarkRouter.get("/GET", auth, bookmarkController.getMyBookmarks);

export default bookmarkRouter;
