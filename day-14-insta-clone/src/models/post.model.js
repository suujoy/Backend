const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        require: [true, "Image Url is required for creating Post"],
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required to create post"],
    },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
