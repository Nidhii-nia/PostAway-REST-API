import PostModel from "./post.model.js";

export default class PostController {
  fetchAllPosts(req, res, next) {
    try {
      let posts = PostModel.getAllPosts();
      res.status(200).send(posts);
    } catch (err) {
      console.log("fetchAllProducts Error");
      next(err);
    }
  }

  fetchPostById(req, res, next) {
    try {
      const id = req.params.id;
      let post = PostModel.getPostById(id);
      res.status(200).send(post);
    } catch (err) {
      next(err);
    }
  }

  fetchUserPost(req, res, next) {
    try {
      const posts = PostModel.getUserPost(req.userId);
      res.status(200).send(posts);
    } catch (err) {
      next(err);
    }
  }

  addPost(req, res, next) {
    const {caption,isDraft} = req.body;
    let imageUrl = req.file.filename;
    const post = PostModel.createPost({userId:req.userId, caption, imageUrl}, isDraft);
    res.status(201).send(post);
  }

  modifyPost(req, res, next) {
    try {
      const id = req.params.id;
      const { caption } = req.body;
      let imageUrl = req.file.filename;
      const post = PostModel.updatePost(id, req.userId, caption, imageUrl);
      res.status(200).send(post);
    } catch (err) {
      next(err);
    }
  }

  removePost(req, res, next) {
    try {
      const id = req.params.id;
      const result = PostModel.deletePost(req.userId, id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  fetchSortedPost(req, res, next) {
    try {
      let sortedPosts = PostModel.sortPosts();
       res.status(200).send(sortedPosts);
    } catch (err) {
      next(err);
    }
  }

  fetchFilteredPosts(req,res,next){
    try{
      const caption = req.query.caption;
      const result = PostModel.filterPosts(caption);
      res.status(200).send(result);
    }catch(err){
      next(err);
    }
  }

archivePost(req, res, next) {
  try {
    const id = req.params.id;
    const post = PostModel.archivePost(id, req.userId);
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
}

publishDraft(req, res, next) {
  try {
    const id = req.params.id;
    const post = PostModel.publishDraft(id, req.userId);
    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
}

fetchUserDrafts(req, res, next) {
  try {
    const drafts = PostModel.getUserDrafts(req.userId);
    res.status(200).send(drafts);
  } catch (err) {
    next(err);
  }
}

fetchArchivedPosts(req, res, next) {
  try {
    const archived = PostModel.getArchivedPosts(req.userId);
    res.status(200).send(archived);
  } catch (err) {
    next(err);
  }
}

}
