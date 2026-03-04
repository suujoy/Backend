const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

/**
 * @name User registerController
 */

const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExist) {
        return res.status(409).json({
            message:
                "User Already Exist with this " +
                (isUserExist.email ? "Email" : "Username"),
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        password: hash,
        email,
    });

    const safeUser = await userModel.findById(user._id).select("-password");

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User Register Successfull",
        user: safeUser,
    });
};

/**
 * @name User loginController
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
            message: "Invalid credentials",
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const safeUser = await userModel
        .findOne({
            $or: [{ username: username }, { email: email }],
        })
        .select("-password");

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" },
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User Logged in successfully",
        user: safeUser,
    });
};

/**
 * @name User getMeController
 */

const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
        });
    }

    res.status(200).json({
        message: "User Fetched Successfully",
        user,
    });
};

/**
 * @name User logoutController
 */

const logoutController = async (req, res) => {
    const token = req.cookies.token;

    res.clearCookie("token");

    await redis.set(token, Date.now().toString());

    res.status(200).json({
        message: "User Logged out successfully",
    });
};

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController,
};
