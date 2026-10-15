const express = require("express");
const cookieParser = require("cookie-parser")
const authRouter = require("../src/routes/auth.route")
const cors = require("cors");
const songRouter = require("./routes/song.route");

const app = express();
const path = require("path");

app.set("trust proxy", 1);

app.use(
    cors({
        origin: ["http://localhost:5173"], // your frontend URL, exactly
        credentials: true,               // needed because you use cookies
    })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/song", songRouter);


const dist = path.join(__dirname, "../../frontend/dist");   // adjust to your folders
console.log("Serving frontend from:", dist);
app.use(express.static(dist));
app.get("/{*splat}", (req, res) => res.sendFile(path.join(dist, "index.html")));


module.exports = app;