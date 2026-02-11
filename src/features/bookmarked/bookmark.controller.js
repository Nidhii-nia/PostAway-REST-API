import BookmarkModel from "./bookmark.model.js";

export default class BookmarkController {
  toggleBookmark(req, res, next) {
    try {
      const postId = req.params.id;
      

      const result = BookmarkModel.toggleBookmark(req.userId, postId);

      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  getMyBookmarks(req, res, next) {
    try {
      const bookmarks = BookmarkModel.getUserBookmarks(req.userId);
      res.status(200).send(bookmarks);
    } catch (err) {
      next(err);
    }
  }
}
