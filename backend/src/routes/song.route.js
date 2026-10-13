const express = require("express");
const { songUploadController, songDeleteController, getSongController } = require("../controllers/song.controller");
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");


const songRouter = express.Router();

songRouter.post("/upload", authMiddleware,upload.single("song"), songUploadController)
songRouter.delete("/delete:songId", authMiddleware, songDeleteController)
songRouter.get("/get", authMiddleware, getSongController)

module.exports = songRouter;
