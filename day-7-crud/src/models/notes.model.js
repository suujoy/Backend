const mongoose = require("mongoose");

const noteScema = new mongoose.Schema({
    title: String,
    description: String,
    age:Number,
});

const noteModel = mongoose.model("notes", noteScema);

module.exports=noteModel
