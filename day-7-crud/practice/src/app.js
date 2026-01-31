const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
    const { title, description, age } = req.body;

    const note = await noteModel.create({
        title,
        description,
        age,
    });

    res.status(201).json({
        massage: "Note Created and Sent it to Database Successfully",
        note,
    });
});

app.get("/notes", async (req, res) => {
    const note = await noteModel.find();

    res.status(200).json({
        massage: "Notes Fatched Successfully",
        note,
    });
});

module.exports = app;
