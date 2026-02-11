import ApplicationError from "../../middlewares/error-handler.middleware.js";
import PostModel from '../post/post.model.js';


export default class BookmarkModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }

  static toggleBookmark(userId, postId) {
    userId = Number(userId);
    postId = Number(postId);

    PostModel.getPostById(postId);

    const index = bookmarks.findIndex(
      b => b.userId === userId && b.postId === postId
    );

    if (index > -1) {
      bookmarks.splice(index, 1);
      return { bookmarked: false };
    }

    const newBookmark = new BookmarkModel(
      bookmarks.length + 1,
      userId,
      postId
    );

    bookmarks.push(newBookmark);
    return { bookmarked: true };
  }

  static getUserBookmarks(userId) {
    userId = Number(userId);

    const userBookmarks = bookmarks.filter(b => b.userId === userId);

    if (userBookmarks.length === 0) {
      throw new ApplicationError(404, "No bookmarks found");
    }

    return userBookmarks.map(b =>
      PostModel.getPostById(b.postId)
    );
  }
}

var bookmarks = [
  new BookmarkModel(1, 3, 2),
  new BookmarkModel(2, 3, 3),
  new BookmarkModel(3, 2, 1),
];
