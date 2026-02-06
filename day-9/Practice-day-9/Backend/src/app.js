/**
 * Server Create karna
 */

const express = require("express");

const app = express();

app.use(express.json());

const noteModel = require("./models/notes.model");

const cors = require('cors')
app.use(cors())

/**
 * POST /api/notes
 *
 * create notes using post api
 */

app.post("/api/notes", async (req, res) => {
    const { title, description, age } = req.body;

    const note = await noteModel.create({ title, description, age });

    res.status(201).json({
        message: "Note Created and Sent it to Database Successfully",
    });
});

/**
 * GET /api/notes
 *
 * Fetch all notes from Database
 */

app.get("/api/notes", async (req, res) => {
    const note = await noteModel.find();

    res.status(200).json({
        message: "Note Fatched Successfully",
        note,
    });
});

/**
 * DELETE /api/notes/:id
 *
 * Delete Notes From Database using 'Delete' api and id
 */

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note Deleted Successfully",
    });
});

/**
 * PATCH /api/notes/:id
 *
 * Update description using delete api and id
 */

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description });

    res.status(200).json({
        message: "Note Description updated Successfully",
    });
});

module.exports = app;
