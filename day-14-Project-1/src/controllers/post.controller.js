const postModel = require("../models/post.model");

const createPostController = async (req, res) => {
    console.log(req.body,req.file);
};

module.exports = {
    createPostController,
};
