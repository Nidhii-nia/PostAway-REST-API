import ApplicationError from "../../middlewares/error-handler.middleware.js";
import PostModel from "../post/post.model.js";

export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  static getPostComments(postId) {
    postId = Number(postId);
    let findPost = comments.filter((p) => p.postId == postId);
    if (findPost !== 0) {
      return findPost;
    } else {
      throw new ApplicationError(404, "No comments!");
    }
  }

  static postComment(postId, userId, comment) {
    postId = Number(postId);
    userId = Number(userId);
    let post = PostModel.getPostById(postId);
    if (post) {
      const maxId =
        comments.length > 0 ? Math.max(...comments.map((c) => c.id)) : 0;
      const newComment = new CommentModel(maxId + 1, userId, postId, comment);
      comments.push(newComment);
      return newComment;
    } else {
      throw new ApplicationError(404, "No post with ID exists!");
    }
  }

  static deleteComment(id, userId) {
    id = Number(id);
    userId = Number(userId);
    let index = comments.findIndex((c) => c.id == id);
    if (index == -1) {
      throw new ApplicationError(404, "No comment found");
    }
    if (comments[index].userId !== userId) {
      throw new ApplicationError(403, "Unauthorized!");
    }

    comments.splice(index, 1);
    return {
      msg: "Comment deleted successfully!",
    };
  }

  static updateComment(id, userId, comment) {
    id = Number(id);
    userId = Number(userId);
    let index = comments.findIndex((c) => c.id == id);
    if (index == -1) {
      throw new ApplicationError(404, "No comment found");
    }
    if (comments[index].userId !== userId) {
      throw new ApplicationError(403, "Unauthorized!");
    }

    comments[index].content = comment;

    return comments[index];
  }
}

var comments = [
  new CommentModel(1, 1, 1, "Hi! When did you come!"),
  new CommentModel(2, 2, 2, "Woow!"),
  new CommentModel(3, 3, 3, "Nice!"),
  new CommentModel(4, 4, 4, "Beauty!"),
];
