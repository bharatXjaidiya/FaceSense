require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/connectToDb")


connectToDb();

app.listen(3000, () => {
    console.log("server is running on PORT 3000")
})