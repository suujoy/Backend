const express = require("express");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const songRouter = require("./routes/song.route");

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/song", songRouter);

module.exports = app;
