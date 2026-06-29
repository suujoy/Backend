import express from "express";
import morgan from "morgan";

import authRouter from "./routes/auth.routes.js";
import handleError from "./middleware/error.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

// Error Handler
app.use(handleError);

export default app;
