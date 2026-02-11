import jwt from "jsonwebtoken";
import ApplicationError from "./error-handler.middleware.js";

export default function auth(req,res,next){

    //Check auth header
    const token = req.headers['authorization'];

    if(!token){
        throw new ApplicationError(403,"Unauthorized!");
    }

    try{
        const payLoad = jwt.verify(token,process.env.SECRET_KEY);
        console.log("PAYLOAD: ",payLoad);
        req.userId = payLoad.userId;
        next();
    }catch(err){
        next(err);
    }

}