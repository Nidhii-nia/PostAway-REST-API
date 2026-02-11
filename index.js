import express from "express";
import ApplicationError from "./src/middlewares/error-handler.middleware.js";
import logger from "./src/middlewares/logger.middleware.js";
import userRouter from "./src/features/user/user.route.js";
import dotenv from 'dotenv';
import postRouter from "./src/features/post/post.route.js";
import commentRouter from "./src/features/comment/comment.route.js";
import likeRouter from "./src/features/like/like.route.js";
import bookmarkRouter from "./src/features/bookmarked/bookmark.route.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8")
);


let app = express();
dotenv.config();

//Body Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logger to log Request Urls
app.use((req, res, next) => {
  if (!(req.url.includes("signup") || req.url.includes("signin") || req.method === 'GET')) {
    let logData = `REQUEST URL: ${req.url} REQUEST BODY: ${JSON.stringify(req.body)}`;
    logger.info(logData);
  }
  next();
});

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

//routes
app.use("/api", userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments',commentRouter);
app.use('/api/likes',likeRouter);
app.use('/api/bookmark',bookmarkRouter);

//Default Path
app.get("/", (req, res) => {
  res.status(200).send("Welcome to POSTAWAY!");
});

//Middleware to handle Invalid paths
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "Oops! The page does not exists. Please see the api-docs to navigate to correct path.",
    );
});

//Middleware to handle Application Level errors
app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  logger.error(err.stack);
  return res.status(500).send("Something went wrong please try again later!");
});

app.listen(3000, () => {
  console.log("App is listening at port 3000");
});
