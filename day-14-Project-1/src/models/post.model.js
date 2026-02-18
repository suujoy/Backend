const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        required: [true, "imgUrl is required"],
    },
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "User id is required for creating an post"],
    },
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
