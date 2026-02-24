const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: [true, "Without Post you cant create a like"],
        },
        user: {
            type: String,
            required: [true, "without user you cant create a like"],
        },
    },
    { timestamps: true },
);

likeSchema.index(
    {
        post: 1,
        user: 1,
    },
    { unique: true },
);

const likeModel = mongoose.model("Like", likeSchema);

module.exports = likeModel;
