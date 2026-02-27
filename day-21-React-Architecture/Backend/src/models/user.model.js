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
            select: false,
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
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
