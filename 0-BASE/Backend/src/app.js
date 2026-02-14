require("dotenv").config();

const noteModel = require("./models/note.model");

const express = require("express");

const app = express();

app.use(express.json());

//Post
app.post("/api/notes", async (req, res) => {
    const { title, description, age } = req.body;

    const note = await noteModel.create({ title, description, age });

    res.status(201).json({
        message: "Note created and sent it to database Successfully",
        note,
    });
});

// Get
app.get("/api/notes", async (req, res) => {
    const note = await noteModel.find();

    res.status(200).json({
        message: "Note Fatched Successfully",
        note,
    });
});

// Delete
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note Deleted Successfully",
    });
});

// Patch
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description, age } = req.body;

    await noteModel.findByIdAndUpdate(id, { title, description, age });

    res.status(200).json({
        message: "Note Updated Successfully",
        title,
        description,
        age,
    });
});

module.exports = app;
