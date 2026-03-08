const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "username must be unique"],
            required: [true, "username is required"],
            trim: true,
        },
        email: {
            type: String,
            unique: [true, "email must be unique"],
            required: [true, "email is required"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minlength: 6,
            select: false,
        },
        bio: {
            type: String,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
