import express from "express";
import runGraph from "./ai/graph.ai.js";
const app = express();

app.get("/", async (req, res) => {
    const result = await runGraph(
        "What are the advantages and disadvantages of using solar energy compared to fossil fuels?",
    );

    console.log(result);
});

export default app;
