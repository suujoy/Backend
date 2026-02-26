const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            default: "",
        },
        imgUrl: {
            type: String,
            default: "",
            required: [true, "img Url is required to create a post"],
        },
        user: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User id is required"],
        },
    },
    { timestamps: true },
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
