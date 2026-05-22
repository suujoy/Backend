import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

// Auth routes
 app.use('/api/auth',authRouter)


export { app };
