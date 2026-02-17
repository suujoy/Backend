const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
    const { email, password, username, bio, profileImage } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExist) {
        return res.status(200).json({
            message:
                "User is already exist" +
                (isUserExist.email === email
                    ? "Email is already exist"
                    : "username is already exist"),
        });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        email,
        password: hash,
        username,
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
        message: "user created",
        user: {
            profileImage: user.profileImage,
            username: user.username,
            email: user.email,
            bio: user.bio,
        },
        token,
    });
});

authRouter.post("/login", async (req, res) => {
    const { email, password, username } = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                username: username,
            },
            {
                email: email,
            },
        ],
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    const isPasswordMatched =
        user.password ===
        crypto.createHash("md5").update(password).digest("hex");

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Password",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User Logged In",
        user: {
            profileImage: user.profileImage,
            username: user.username,
            email: user.email,
            bio: user.bio,
        },
        token,
    });
});

module.exports = authRouter;
