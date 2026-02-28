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
    /**
     * Getting postId and username
     */

    const postId = req.params.postId;
    const username = req.user.username;

    /**
     * Check if post exists in database
     */

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(400).json({
            message: `Post not found with this post id ${postId}`,
        });
    }

    /**
     * Check if user already liked that post
     */

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username,
    });

    if (isAlreadyLiked) {
        return res.status(400).json({
            message: "Post is already liked",
        });
    }

    /**
     * Create a like record in the database
     */
    const likeRecord = await likeModel.create({
        post: postId,
        user: username,
    });

    /***
     * Sending response
     */

    res.status(201).json({
        message: "Post liked successfully",
        likeRecord,
    });
};

/**
 * unLikePostController
 */

const unLikePostController = async (req, res) => {
    const postId = req.params.postId;
    const username = req.user.username;

    const likedPost = await likeModel.findOne({
        post: postId,
        user: username,
    });

    if (!likedPost) {
        return res.status(404).json({
            message:
                "This post is not a liked post , You have to like before unlike ",
        });
    }

    await likeModel.findOneAndDelete({ _id: likedPost._id });

    res.status(200).json({
        message: "Post Unliked SuccessFully",
    });
};

/**
 * getFeedController
 */

const getFeedController = async (req, res) => {
    const user = req.user;

    /**
     * for reverse
     */

    const posts = await Promise.all(
        (await postModel.find().populate("user").lean()).map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id,
            });

            //  !! or use Boolean

            post.isLiked = Boolean(isLiked);

            return post;
        }),
    );

    res.status(200).json({
        message: "Post fetched successfully",
        posts,
    });
};

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unLikePostController,
    getFeedController,
};
