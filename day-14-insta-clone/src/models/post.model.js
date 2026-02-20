const mongoose = require("mongoose");

postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        required: [true, "ImgUrl not is required for create a post"],
    },
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user id is required for creating a post']
    }
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
