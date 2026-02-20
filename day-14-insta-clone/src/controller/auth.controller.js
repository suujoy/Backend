const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const express = require("express");

/**
 * register controller
 */

const registerController = async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            {
                email: email,
            },
            {
                username: username,
            },
        ],
    });

    if (isUserExist) {
        return res.status(409).json({
            message:
                "User already exist" +
                (isUserExist.email === email
                    ? "With this email"
                    : "with this username"),
        });
    }

    const user = await userModel.create({
        username,
        email,
        password,
        bio,
        profileImage,
    });

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
};

module.exports={
    registerController
}
