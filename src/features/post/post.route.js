import express from "express";
import PostController from "./post.controller.js";
import auth from "../../middlewares/auth.middleware.js";
import fileUpload from "../../middlewares/file-upload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();


postRouter.get("/GET/filter", auth, postController.fetchFilteredPosts);
postRouter.get("/GET/sorted", auth, postController.fetchSortedPost);
postRouter.get("/GET/drafts", auth, postController.fetchUserDrafts);
postRouter.get("/GET/archived", auth, postController.fetchArchivedPosts);

postRouter.get("/GET/all", auth, postController.fetchAllPosts);
postRouter.get("/GET", auth, postController.fetchUserPost);
postRouter.get("/GET/:id", auth, postController.fetchPostById);


postRouter.post(
  "/POST",
  auth,
  fileUpload.single("imageUrl"),
  postController.addPost,
);

postRouter.put(
  "/PUT/:id",
  auth,
  fileUpload.single("imageUrl"),
  postController.modifyPost,
);

postRouter.delete("/DELETE/:id", auth, postController.removePost);


postRouter.patch("/PATCH/:id/publish", auth, postController.publishDraft);

postRouter.patch("/PATCH/:id/archive", auth, postController.archivePost);

export default postRouter;
