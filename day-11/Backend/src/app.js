require("dotenv").config();

const path = require("path");

const cors = require("cors");

const express = require("express");
const noteModel = require("./models/note.model");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('./public'))

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

    const { title, description, age } = req.body;

    await noteModel.findByIdAndUpdate(id, { title, description, age });

    res.status(200).json({
        message: "Note Updated Succcessfully",
        description,
    });
});

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
