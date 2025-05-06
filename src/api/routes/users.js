const { isAuth } = require("../../middlewares/auth");
const { getUsers, updateUser, deleteUser, registerUser, getUser, login } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", login);
usersRouter.get("/users", isAuth, getUsers);
usersRouter.get("/:id", getUser);
usersRouter.put("/:id", isAuth, updateUser);
usersRouter.delete("/:id", isAuth, deleteUser);

module.exports = usersRouter;