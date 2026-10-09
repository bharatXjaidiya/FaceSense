const songModel = require("../models/song.model");
const imagekit = require("../services/imageKit.service")
const NodeID3 = require("node-id3");

const songUploadController = async (req, res) => {

    const { mood } = req.query
    const { title } = req.body
    const tags = NodeID3.read(req.file.buffer);


    if (!req.file) {
        return res.status(400).json({ message: "Song file required." });
    }

    if (!title) {
        return res.status(400).json({ message: "Song title is required." })
    }

    if (!mood) {
        return res.status(400).json({ message: "Mood status is requred." })
    }

    const { songFile, posterFile } = await Promise.all([
        imagekit.upload({
            file: req.file.buffer,                  // buffer from multer
            fileName: `${Date.now()}-${req.file.originalname}.mp3`,
            folder: "/face-sense/song",
        }),
        imagekit.upload({
            file: tags.image.imageBuffer,
            fileName: `${Date.now()}-poster.jpg`,
            folder: "/face-sense/posters",
        })
    ])

    const song = await songModel.create({
        songUrl: songFile.url,
        songFileId: songFile.fileId,
        posterUrl: posterFile?.url,
        posterFileId: posterFile?.fileId,
        title: req.body.title || tags.title || req.file.originalname,
        mood: mood,
        uploadedBy: req.body.userId
    })

    return res.status(201).json({ message: "Song uploaded successfully.", song })

}

const songDeleteController = async (req, res) => {
    const { songId } = req.params.songId;

    const song = await songModel.findById(songId)

    if (!song) {
        return res.status(404).json({ message: "Song doesn't found" });
    }

    // default songs can never be deleted
    if (song.isDefault) {
        return res.status(403).json({ message: "Default songs cannot be deleted." });
    }

    // only the owner can delete
    if (song.uploadedBy?.toString() !== req.userId) {
        return res.status(404).json({ message: "Song not found." });
    }

    await Promise.allSettled([
        imagekit.deleteFile(song.songFileId),
        song.posterFileId && imagekit.deleteFile(song.posterFileId),
    ]);

    await song.deleteOne();

    res.status(200).json({ message: "Song deleted." })
}

const getSongController = async (req, res) => {
    const userId = req.user.userId;

    const songs = await songModel.find({
        $or: [
            { isDefault: true },
            { uploadedBy: userId }
        ]
    }).sort({ createdAt: -1 });

    return res.status(200).json({message : "Song fetched succesfully." ,  songs });
}

module.exports = { songUploadController, songDeleteController, getSongController}