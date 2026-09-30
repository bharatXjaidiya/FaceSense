const mongoose = require("mongoose");

async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connnect to DB")
    }
    catch(err){
        console.log("DB error : " + err)
    }
}

module.exports = connectToDb;