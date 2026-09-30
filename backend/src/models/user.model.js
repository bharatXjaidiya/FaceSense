const mongoose = require("mongoose");
const { type } = require("node:os");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, "user name is required"]
    },
    email: {
        type: String,
        unique: true,
        require: [true, "email is required."]
    },
    password: {
        type: String,
        unique: true,
        require: [true, "password is required"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other", "prefer_not_to_say"],
            message: "{VALUE} is not a valid gender",
        },
        default: "prefer_not_to_say",
    },
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;