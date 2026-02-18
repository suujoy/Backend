const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    bio: {
        type: String,
    },

    profileImage: {
        type: String,
        default:
            "https://ik.imagekit.io/teim9v6vi/deffault%20image.webp?updatedAt=1771319584629",
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
