const express = require("express");
const noteModule = require("./models/notes.model");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log('object')
console.log('fix')

app.post("/api/notes", (req, res) => {
    const { title, description, age } = req.body;

    const note = noteModule.create({ title, description, age });

    res.status(201).json({
        massage: "Note created and sent it to database",
    });
});

app.get("/api/notes", async (req, res) => {
    const note = await noteModule.find();
    res.status(200).json({
        massage: "Note Fatched Successfully",
        note,
    });
});

app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    await noteModule.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully",
    });
});

app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModule.findByIdAndUpdate(id, { description });

    res.status(200).json({
        message: "Note description updated Successfully",
    });
});

module.exports = app;
