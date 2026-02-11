import ApplicationError from "../../middlewares/error-handler.middleware.js";

export default class UserModel{
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addUser(name,email,password){
        const maxId = users.length>0 ? Math.max(...users.map(u => u.id)) : 0;
        let newUser = new UserModel(maxId+1,name,email,password);
        users.push(newUser);
        return newUser;
    }

    static confirmLogin(email,password){
        const validUser = users.find(u => u.email == email && u.password == password);
        if(validUser){
            return validUser;
        }else{
            throw new ApplicationError(401,"Incorrect Credentials");
        }
    }

}

var users = [
    new UserModel(1,"Laali","away@post.com","pass1"),
    new UserModel(2,"Nidhi","away@post.com","pass2"),
    new UserModel(3,"Rosa","away@post.com","pass3"),
    new UserModel(4,"Neha","away@post.com","pass4"),
]