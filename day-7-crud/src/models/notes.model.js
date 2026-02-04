const mongoose = require("mongoose");

const noteScema = new mongoose.Schema({
    title: String,
    description: String,
    age:Number,
});
console.log('hello')

const noteModel = mongoose.model("notes", noteScema);

module.exports=noteModel
