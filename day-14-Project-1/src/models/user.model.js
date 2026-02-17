const mongoose = require("mongoose");

const userSchima = new mongoose.Schema({
    userName: {
        type: String,
        unique: [
            true,
            "User with this username already exists in the database",
        ],
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: [true, "email already exist"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is requires"],
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/teim9v6vi/deffault%20image.webp",
    },
});

const userModel = mongoose.model("User", userSchima);

module.exports = userModel;
