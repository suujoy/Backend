const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "With this username user already exist"],
    },
    email: {
        type: String,
        require: true,
        unique: [true, "Email already exist"],
    },
    password: {
        type: String,
        required: true,
    },
    bio: String,
    profileImage: {
        type: String,
        default:
            "https://ik.imagekit.io/teim9v6vi/deffault%20image.webp?updatedAt=1771319584629",
    },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
