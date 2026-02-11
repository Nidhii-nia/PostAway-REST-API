import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {

  registerUser(req, res) {
    const { name, email, password } = req.body;
    const result = UserModel.addUser(name, email, password);
    res.status(201).send(result);
  }

  LoginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = UserModel.confirmLogin(email, password);
      const token = jwt.sign(
        { userId:user.id,email:user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );
      res.status(200).send(token);
    } catch (err) {
      next(err);
    }
  }
}
