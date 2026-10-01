const express = require("express");
const { loginController, registerController, getMeController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register",registerController)
authRouter.post("/login",loginController)
authRouter.get("/get-me",authMiddleware,getMeController);


module.exports = authRouter;