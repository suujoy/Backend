const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadFile = require("../services/storage.service");
const redis = require("../config/cache");

/**
 * registerController
 */

const registerController = async (req, res) => {
    const { username, email, password, bio } = req.body;

    let profileImageFile = null;


    if (req.file) {
        profileImageFile = await uploadFile({
            buffer: req.file.buffer,
            filename: req.file.originalname,
            folder: "tmdb/users/profileImage",
        });
    }

    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExist) {
        return res.status(409).json({
            message:
                "User already exists with this " +
                (isUserExist.email ? "email" : "username"),
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage: profileImageFile?.url,
    });

    const safeUser = await userModel.findById(user._id).select("-password");

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered",
        user: safeUser,
    });
};

/**
 * loginController
 */

const loginController = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel
        .findOne({
            $or: [{ username: username }, { email: email }],
        })
        .select("+password");
    if (!user) {
        return res.status(401).json({
            message: "unauthorize access",
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "unauthorize access",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    );

    res.cookie("token", token);

    const safeUser = await userModel.findById(user._id);

    res.status(200).json({
        message: "User Logged in",
        user: safeUser,
    });
};

/**
 * getMeController
 */

const getMeController = async (req, res) => {
    const user = await req.user;

    if (!user) {
        return res.status(401).json({
            message: "Unauthorize access",
        });
    }

    res.status(200).json({
        message: "User Fetched Successfully",
        user,
    });
};

/**
 * logoutController
 */

const logoutController = async (req, res) => {
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token, "blacklisted", "EX", 604800);

    res.status(200).json({
        message: "User Log out successfully",
    });
};

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController,
};
