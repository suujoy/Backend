const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "Username must be unique"],
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            unique: [true, "Email Must Be Unique"],
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
    },
    {
        timestamps: true,
    },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
