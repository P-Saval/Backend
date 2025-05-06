
const Post = require("../models/Post");


const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find();
		return res.status(200).json(posts)
	} catch (error) {
		return next(error)
	}
}

const newPost = async (req, res, next) => {
    try {
      const newPost = new Post(req.body);
      if(req.file){
        newPost.image = req.file.path;
      }
      const createdPost = await newPost.save();
      return res.status(201).json(createdPost);
    } catch (error) {
      next(error);
    }
  }

const updatePost = async (req, res, next) => {
    try{
        const { id } = req.params;
        const newPost = new Post(req.body);
        newPost._id = id;
        const postUpdated = await Post.findByIdAndUpdate(id, newPost, {
          new: true,
        });
        return res.status(200).json(postUpdated);
    } catch (error) {
        return next(error);
} 
}

const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params;
        const postDeleted = await Post.findByIdAndDelete(id);

        return res.status(200).json({
          message: 'Post deleted!',
          element: postDeleted
    });
    } catch (error) {
        return next(error);
    }
}
module.exports = {
    getPosts,
    newPost,
    updatePost,
    deletePost
};