const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
   

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "insta-clone-post",
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id,
    });

    res.status(201).json({
        message: "post created successfully",
        post,
    });
};

const getPostController = async (req, res) => {


    const userId = req.user.id

    const posts = await postModel.find({
        user: userId,
    });

    res.status(200).json({
        message: "Posts fetched successfully",
        posts,
    });
};

const getPostDetails = async (req, res) => {


    const userId = req.user.id
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "post not found",
        });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden  Content",
        });
    }

    res.status(200).json({
        message: "Post fetched successfully",
        post,
    });
};

module.exports = { createPostController, getPostController,getPostDetails };
