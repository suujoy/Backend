const mongoose = require("mongoose");

const userSchima = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "With this email user is already exist"],
    },
    password: String,
});

const userModel = mongoose.model("User", userSchima);

module.exports = userModel;
