const { Router } = require("express");
const { login, signup, logout } = require("../controllers/userController");

const UserRouter = Router();

UserRouter.post("/login", login);
UserRouter.post("/signup", signup);
UserRouter.post("/logout", logout);

module.exports = UserRouter;
