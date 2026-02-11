import multer from "multer";
import path from "path";

const storageConfig = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(process.cwd(),'Images'));
    },
    filename: (req,file,cb) => {
        const name = new Date().toISOString().replace(/:/g,'-') + file.originalname;
        cb(null,name);
    }
})

const fileUpload = multer({
    storage:storageConfig
})

export default fileUpload;