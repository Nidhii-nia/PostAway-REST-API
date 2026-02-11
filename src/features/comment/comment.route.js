import express from 'express';
import CommentController from './comment.controller.js';
import auth from '../../middlewares/auth.middleware.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get('/GET/:id',auth,commentController.fetchPostComments);
commentRouter.post('/POST/:id',auth,commentController.addComment);
commentRouter.delete('/DELETE/:id',auth,commentController.removeComment);
commentRouter.put('/PUT/:id',auth,commentController.modifycomment);

export default commentRouter;