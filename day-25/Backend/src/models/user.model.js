const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "With This username , user already exist"],
            required: [true, "Username is required for "],
        },
        email: {
            type: String,
            unique: [true, "Email Must be unique"],
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            select: false,
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
