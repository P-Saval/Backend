const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getUsers, updateUser, deleteUser, registerUser, getUser, login } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.post("/register", upload.single("image"), registerUser);
usersRouter.post("/login", login);
usersRouter.get("/users", isAdmin, getUsers);
usersRouter.get("/:id", getUser);
usersRouter.put("/:id", isAuth, updateUser);
usersRouter.delete("/:id", isAuth, deleteUser);

module.exports = usersRouter;