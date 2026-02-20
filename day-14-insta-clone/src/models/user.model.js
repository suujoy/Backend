const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: "",
        },
        profileImage: {
            type: String,
            default: "https://ik.imagekit.io/teim9v6vi/deffault%20image.webp?updatedAt=1771319584629",
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
