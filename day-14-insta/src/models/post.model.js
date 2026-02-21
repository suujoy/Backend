const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            default: "",
        },
        imgUrl: {
            type: String,
            required: [true, "Img Url is required to create a post"],
        },
        user: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User id required to create a post"],
        },
    },
    { timestamps: true },
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
