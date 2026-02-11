import ApplicationError from "../../middlewares/error-handler.middleware.js";

export default class PostModel {
  constructor(id, userId, caption, imageUrl, postedAt, status) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.postedAt = postedAt;
    this.status = status;
  }

  

  static createPost({ userId, caption, imageUrl }, isDraft = false) {
    const post = new PostModel(
      posts.length + 1,
      userId,
      caption,
      imageUrl,
      isDraft ? null : Date.now(),
      isDraft ? "draft" : "published"
    );

    posts.push(post);
    return post;
  }

  static getAllPosts() {
    const published = posts.filter(p => p.status === "published");

    if (published.length === 0) {
      throw new ApplicationError(404, "No posts available!");
    }

    return published;
  }

  static getPostById(id) {
    id = Number(id);
    const post = posts.find(p => p.id === id);

    if (!post) {
      throw new ApplicationError(404, "No post exists with the given Id!");
    }

    return post;
  }

  static getUserPost(userId) {
    userId = Number(userId);
    const userPosts = posts.filter(p => p.userId === userId);

    if (userPosts.length === 0) {
      throw new ApplicationError(404, "No posts available!");
    }

    return userPosts;
  }

  static getUserDrafts(userId) {
    const drafts = posts.filter(
      p => p.userId === userId && p.status === "draft"
    );

    if (drafts.length === 0) {
      throw new ApplicationError(404, "No drafts found");
    }

    return drafts;
  }

  static getArchivedPosts(userId) {
    const archived = posts.filter(
      p => p.userId === userId && p.status === "archived"
    );

    if (archived.length === 0) {
      throw new ApplicationError(404, "No archived posts found");
    }

    return archived;
  }

  

  static updatePost(id, userId, caption, imageUrl) {
    id = Number(id);
    userId = Number(userId);

    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new ApplicationError(404, "Post not found");
    }

    if (posts[index].userId !== userId) {
      throw new ApplicationError(403, "Unauthorized");
    }

    Object.assign(posts[index], {
      caption,
      imageUrl,
      postedAt: Date.now(),
    });

    return posts[index];
  }

  static publishDraft(id, userId) {
    id = Number(id);

    const post = posts.find(p => p.id === id);
    if (!post) {
      throw new ApplicationError(404, "Post not found");
    }

    if (post.userId !== userId) {
      throw new ApplicationError(403, "Unauthorized");
    }

    if (post.status !== "draft") {
      throw new ApplicationError(400, "Post is not a draft");
    }

    post.status = "published";
    post.postedAt = Date.now();

    return post;
  }

  static archivePost(id, userId) {
    id = Number(id);

    const post = posts.find(p => p.id === id);
    if (!post) {
      throw new ApplicationError(404, "Post not found");
    }

    if (post.userId !== userId) {
      throw new ApplicationError(403, "Unauthorized");
    }

    post.status = "archived";
    return post;
  }


  static deletePost(userId, id) {
    id = Number(id);

    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new ApplicationError(404, "Post not found!");
    }

    if (posts[index].userId !== userId) {
      throw new ApplicationError(403, "Unauthorized!");
    }

    posts.splice(index, 1);

    return { msg: "Post deleted successfully!" };
  }


  static sortPosts() {
    const published = posts.filter(p => p.status === "published");

    if (published.length === 0) {
      throw new ApplicationError(404, "No posts found");
    }

    return [...published].sort((a, b) => b.postedAt - a.postedAt);
  }

  static filterPosts(caption) {
    if (!caption || caption.trim().length === 0) {
      throw new ApplicationError(400, "Please enter a caption first!");
    }

    const search = caption.trim().toLowerCase();

    const matchedPosts = posts.filter(
      p =>
        p.status === "published" &&
        String(p.caption).toLowerCase().includes(search)
    );

    if (matchedPosts.length === 0) {
      throw new ApplicationError(
        404,
        `No posts with caption "${caption}" found`
      );
    }

    return matchedPosts;
  }
}


let posts = [
  new PostModel(1, 1, "Soothing", "xyz.png", 1770794502314, "published"),
  new PostModel(2, 2, "Manali", "xy.png", 1770794502315, "published"),
  new PostModel(3, 3, "Hiking", "xz.png", 1770794502316, "draft"),
  new PostModel(4, 4, "Rosa it's me!", "yz.png", 1770794502317, "archived"),
];
