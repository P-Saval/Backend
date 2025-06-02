
const User = require("../api/models/users");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const [,token] = req.headers.authorization.split(" ");
    const { id } =  verifyJwt(token);
    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("Unauthorized")
    
  }
}

const isAdmin = function (req, res, next){
  if(req.user.role !== "admin"){
    return res.status(401).json("Unauthorized")
  }
  next()
  }
module.exports = { 
  isAuth,
  isAdmin
 };