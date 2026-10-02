const express = require("express");
const cookieParser = require("cookie-parser")
const authRouter = require("../src/routes/auth.route")
const cors = require("cors")

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // your frontend URL, exactly
        credentials: true,               // needed because you use cookies
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);


module.exports = app;