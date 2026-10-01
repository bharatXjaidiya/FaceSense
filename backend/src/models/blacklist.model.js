const mongoose = require("mongoose");

const blackListSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true,
    }
},{timestamps : true})

const blackListModel = mongoose.model("black-list",blackListSchema);

module.exports = blackListModel;