require("dotenv").config();

const cors = require("cors");

const express = require("express");
const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/notes", async (req, res) => {
    const { title, description, age } = req.body;

    const note = await noteModel.create({ title, description, age });

    res.status(201).json({
        message: "Note Created and sent it to DataBase Successfully",
        note,
    });
});

app.get("/api/notes", async (req, res) => {
    const note = await noteModel.find();

    res.status(200).json({
        message: "Note Fetched Succcessfully",
        note,
    });
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note Deleted Succcessfully",
    });
});

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description });

    res.status(200).json({
        message: "Note Description Updated Succcessfully",
        description,
    });
});

module.exports = app;
