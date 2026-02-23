const postModel = require("../models/post.models");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Create Post Controller
 */
const createPostController = async (req, res) => {
    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).json({
            message: "file not found",
        });
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "test",
        folder: "insta-clone",
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: userId,
    });

    res.status(201).json({
        message: "Post Created",
        post,
    });
};

/**
 * getPostController
 */

const getPostController = async (req, res) => {
    const userId = req.user.id;

    const post = await postModel.find({
        user: userId,
    });

    res.status(200).json({
        message: "Post fetched successfully",
        post,
    });
};

/**
 * getPostDetailsController
 */

const getPostDetailsController = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found",
        });
    }

    const isValidUser = post.user.toHexString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content",
        });
    }

    res.status(200).json({
        message: "Post fetched Successfully",
        post,
    });
};

/**
 * likePostController
 */

const likePostController = async (req, res) => {
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: `Post is not exist with this ${postId} postId`,
        });
    }

    const like = await likeModel.create({
        post: postId,
        user: username,
    });

    res.status(200).json({
        message: `Post Liked successfully`,
        like,
    });
};

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
};
