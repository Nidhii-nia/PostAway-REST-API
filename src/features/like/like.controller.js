import LikeModel from "./like.model.js";


export default class LikeController{

    fetchAllLikes(req,res,next){
        try{
            const postId = req.params.postId;
            const result = LikeModel.getAllLikes(postId);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }

    switchLikeStatus(req,res,next){
        try{
            const postId = req.params.postId;
            const result = LikeModel.toggleLikeStatus(postId,req.userId);
            res.status(200).send(result);
        }catch(err){
            next(err);
        }
    }
}