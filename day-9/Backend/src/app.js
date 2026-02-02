/**
 * Server Create karna
 */

const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();
const mongoose = require("mongoose");

// Middlewere
app.use(express.json());

/**
 * POST /api/notes
 */

app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title,
        description,
    });

    res.status(201).json({
        massage: "Note Created and sent to Database",
        note,
    });
});

/**
 * GET /api/notes
 */

app.get("/api/notes", async (req, res) => {
    const note = await noteModel.find();

    res.status(200).json({
        massage: "Note Fatched Successfully",
        note,
    });
});

/**
 * DELETE /api/notes/:id
 */

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        massage: "note deleted successfully",
    });
});

/**
 * PATCH /api/notes/:id
 * update the description of the note by id
 * req.body = {description}
 */

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    console.log('Sujoy')

    await noteModel.findByIdAndUpdate(id, { description });
    res.status(200).json({
        massage: "note description updated successfully",
    });
});

module.exports = app;
