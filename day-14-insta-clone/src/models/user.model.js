const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: [true, "UserName Must be Unique"],
        },
        email: {
            type: String,
            required: true,
            unique: [true, "Email Must be unique to create a new user"],
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
            default:
                "https://ik.imagekit.io/teim9v6vi/default%20profile%20image.webp",
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
