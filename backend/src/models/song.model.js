const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    songUrl: { type: String, required: true },
    songFileId: { type: String, required: true },
    posterUrl: { type: String },
    posterFileId: { type: String },
    title: { type: String, required: true },
    mood: { enum: ["sad", "happy", "surprised"] },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    },
    isDefault: { type: Boolean, default: false }, // never send by the user just true for the seed script othewise false
    seedKey: { type: String, unique: true, sparse: true }, // only default songs have it
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel;

