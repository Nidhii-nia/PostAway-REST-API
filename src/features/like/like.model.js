import ApplicationError from "../../middlewares/error-handler.middleware.js";
import PostModel from "../post/post.model.js";

export default class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }

  static getAllLikes(postId) {
    postId = Number(postId);
    const post = PostModel.getPostById(postId);
    if (post) {
      const liked = likes.filter((p) => p.postId == postId);
      if (liked.length > 0) {
        return liked;
      } else {
        throw new ApplicationError(404, "No likes on this post!");
      }
    } else {
      throw new ApplicationError(404, "No post exists with this ID!");
    }
  }

  static toggleLikeStatus(postId, userId) {
    postId = Number(postId);
    userId = Number(userId);
    const post = PostModel.getPostById(postId);
    if (post) {
      const index = likes.findIndex(
        (l) => l.postId == postId && l.userId == userId,
      );
      if (index == -1) {
        const maxId =
          likes.length > 0 ? Math.max(...likes.map((l) => l.id)) : 0;
        const liked = new LikeModel(maxId + 1, userId, postId);
        likes.push(liked);
        return `Post with id ${postId} liked successfully!`;
      } else {
        likes.splice(index, 1);
        return `Post with id ${postId} disliked successfully!`;
      }
    } else {
      throw new ApplicationError(404, "No post exists with given id!");
    }
  }
}

var likes = [
  new LikeModel(1, 1, 1),
  new LikeModel(2, 2, 2),
  new LikeModel(3, 3, 3),
];
