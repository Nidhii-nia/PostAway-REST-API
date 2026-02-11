import express from 'express';
import LikeController from './like.controller.js';
import auth from '../../middlewares/auth.middleware.js';

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.get('/GET/toggle/:postId',auth,likeController.switchLikeStatus);
likeRouter.get('/GET/:postId',auth,likeController.fetchAllLikes);

export default likeRouter;