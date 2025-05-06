const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

const postSchema = new Schema(
    {
     post: {type: String, required: true, trim: true},
    }, 
    {
    timestamps: true,
}
)

const Post = mongoose.model("posts", postSchema, "posts");
module.exports = Post;