const express = require("express");
const { loginController, registerController, getMeController, logoutController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register",registerController)
authRouter.post("/login",loginController)
authRouter.get("/get-me",authMiddleware,getMeController);
authRouter.get("/logout",authMiddleware,logoutController);


module.exports = authRouter;