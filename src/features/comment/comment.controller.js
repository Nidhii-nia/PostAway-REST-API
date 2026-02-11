import CommentModel from "./comment.model.js";

export default class CommentController{

    fetchPostComments(req,res,next){
        try{
            const id = req.params.id;
            const result = CommentModel.getPostComments(id);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }

    addComment(req,res,next){
        try{
            const id = req.params.id;
            const comment = req.body.comment;
            const result = CommentModel.postComment(id,req.userId,comment);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }

    removeComment(req,res,next){
        try{
            const id = req.params.id;
            const result = CommentModel.deleteComment(id,req.userId);
            res.status(200).json(result);
        }catch(err){
            next(err);
        }
    }

    modifycomment(req,res,next){
        try{
            const id = req.params.id;
            const comment = req.body.comment;
            const result = CommentModel.updateComment(id,req.userId,comment);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }
}