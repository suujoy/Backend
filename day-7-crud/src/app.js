const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
    const { title, description,age } = req.body;

    const note = await noteModel.create({
        title,
        description,
        age,
    });

    res.status(201).json({
        massage: "Note Created SuccessFully and Sent it to Database",
        note,
    });
});

module.exports = app;
