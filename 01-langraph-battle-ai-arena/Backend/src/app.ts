import express from "express";
import runGraph from "./ai/graph.ai.js";
import { success } from "zod";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use(express.json());

app.get("/", async (req, res) => {
    const result = await runGraph(
        "What is the capital of india and its beauty in simple and short words?",
    );

    res.status(201).json({
        message: result,
    });
});

app.post("/invoke", async (req, res) => {
    const { input } = req.body;

    const result = await runGraph(input);

    res.status(201).json({
        message: "Graph executed successfully",
        success: true,
        result,
    });
});

export default app;
