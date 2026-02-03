/**
 * server create karna
 */

const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

/**
 * POST /api/notes
 */

app.post("/api/notes", async (req, res) => {
    const { title, description, age } = req.body;

    const note = await noteModel.create({
        title,
        description,
        age,
    });

    res.status(201).json({
        massage: "Note Created Successfully and sent it to database",
        note,
    });
});

/**
 * GET /api/notes
 *
 * Fatch all note from noteModel
 */

app.get("/api/notes", async (req, res) => {
    const note = await noteModel.find();
    res.status(200).json({
        massage: "Note Fatched Successfully",
        note,
    });
});

/**
 * DELETE  /api/notes/:id
 *
 * Delete note by id
 */

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        massage: "Note Deleted Successfully",
    });
});

/**
 * PATCH /api/notes/:id
 *
 * Find by id and update description
 */

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModel.findOneAndUpdate({ _id: id }, { description });

    res.status(200).json({
        massage: "description updated successfully",
    });
});
module.exports = app;
