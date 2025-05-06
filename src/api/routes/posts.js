const upload = require("../../middlewares/file");
const { getPosts, updatePost, deletePost, newPost } = require("../controllers/posts");


const postRouter = require("express").Router();

postRouter.get("/myposts", getPosts);
postRouter.post("/post", newPost);
postRouter.put("/post/:id", updatePost);
postRouter.delete("/post/:id", deletePost);

module.exports = postRouter;