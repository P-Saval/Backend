/*function authenticateMiddleware(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }
    next();
  }*/

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

module.exports = { isAuth };