require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/connectToDb")


connectToDb();

app.listen(process.env.PORT || 3000)