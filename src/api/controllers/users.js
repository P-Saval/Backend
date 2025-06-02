
const { deleteFile } = require("../../utils/deleteFile");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json(users)
	} catch (error) {
		return next(error)
	}
}
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("post");
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json("error")
  }
}
const registerUser = async (req, res, next) => {
  try {
    const user = new User(req.body);

    if (req.file) {
      User.image = req.file.path;
    }
    const emailExist = await User.findOne({ email: user.email })
    if (emailExist) {
        return res.status(400).json("Email already exists");
    }
    const userExist = await User.findOne({ username: user.username })
    if (userExist) {
      return res.status(400).json("Username already exists");
    }
    const userSaved = await user.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    console.log(error);
    return res.status(400).json("error registrando al usuario");
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).json("Username or password incorrect");
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ token, user });
    } else{
      return res.status(400).json("Username or password incorrect");
    }
  } catch (error) {
    return res.status(400).json("error");
  }
  
}

const updateUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const newUser = new User(req.body);
        newUser._id = id;
        const userUpdated = await User.findByIdAndUpdate(id, newUser, {
          new: true,
        });
        return res.status(200).json(userUpdated);
    } catch (error) {
        return next(error);
} 
}

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);

        deleteFile(deleteUser.image);

        return res.status(200).json('User deleted!');
    } catch (error) {
        return next(error);
    }
}

module.exports = {
  registerUser,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}