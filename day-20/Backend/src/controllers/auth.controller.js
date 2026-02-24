const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Register Controller
 */

const registerController = async (req, res) => {
    /**
     * Getting data from req.body
     */
    const { email, username, password, bio, profileImage } = req.body;

    /**
     * Check if user is already exist
     */
    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExist) {
        return res.status(409).json({
            message:
                "User Is already exist with this" +
                (isUserExist.email ? "email" : "username"),
        });
    }

    /**
     * Password hashing
     */
    const hash = await bcrypt.hash(password, 10);

    /**
     * creating user
     */
    const user = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profileImage,
    });

    /**
     * jwt sign and token creation
     */
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
        },
        process.env.JWT_SECRET,
    );

    /**
     * saving cookie to the browser cookie storage
     */
    res.cookie("token", token);

    /**
     * user register done status show
     */
    res.status(201).json({
        message: "User Registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
};

/**
 * login Controller
 */

const loginController = async (req, res) => {
    /**
     * Getting data form req.body
     */
    const { email, username, password } = req.body;

    /**
     * check if user exist or not
     */
    const user = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (!user) {
        return res.status(409).json({
            message: "User not found",
        });
    }

    /**
     * compare password
     */
    const isPassWordMatched = await bcrypt.compare(password, user.password);

    if (!isPassWordMatched) {
        return res.status(401).json({
            message: "Invalid Password",
        });
    }

    /**
     * token creation and jwt sign
     */
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
        },
        process.env.JWT_SECRET,
    );

    /**
     * sending cookie to browser cookie storage
     */
    res.cookie("token", token);

    /**
     * status show / user login
     */
    res.status(200).json({
        message: "user Logged in successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
};

const getMeController = async (req, res) => {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
        },
    });
};

module.exports = { registerController, loginController,getMeController };
