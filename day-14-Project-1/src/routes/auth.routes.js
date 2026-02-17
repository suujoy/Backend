const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

/**
 * /api/auth/register
 */

authRouter.post("/register", async (req, res) => {
    const { userName, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ userName }, { email }],
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message:
                "User already exist " +
                (isUserAlreadyExist.email === email
                    ? "Email already exist "
                    : "UserName already exist"),
        });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({
        userName,
        email,
        password: hash,
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
        message: "User Created",
        user: {
            email: user.email,
            userName: user.userName,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
});

authRouter.post("/login", async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {
                userName: userName,
            },
            {
                email: email,
            },
        ],
    });

    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
        });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");

    const isPasswordValid = hash === user.password;

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Password not matched",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User LoggedIn ",
        user: {
            userName: user.userName,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
});
module.exports = authRouter;
