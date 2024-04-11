const { Router } = require("express");
const UserRouter = require("./userRouter");

const mainRouter = Router();

mainRouter.use("/user", UserRouter); 

module.exports = mainRouter;
