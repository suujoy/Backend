const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    }),
);

/**
 * Require Routes
 */
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

/**
 * Using Routes
 */

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use(express.static('./public'))
app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
