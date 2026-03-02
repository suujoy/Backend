const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ username: username }, { email: email }],
    });

    if (isUserExist) {
        return res.status(400).json({
            message:
                `User already exist with this ` +
                (isUserExist.username ? "username" : "email"),
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
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
        message: "User regestered Successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        },
    });
};

const loginUserController = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel
        .findOne({
            $or: [{ username: username }, { email: email }],
        })
        .select("+password");

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials",
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return res.status(404).json({
            message: "Invalid credentials",
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
        message: "User Logged in Successfully",
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        },
    });
};

const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: "User Found",
        user,
    });
};

const logoutController = async (req, res) => {
    const token = req.cookies.token;

    res.clearCookie("token");

    await blacklistModel.create({ token });

    res.status(200).json({
        message: "Logged out successfully",
    });
};

module.exports = {
    registerUserController,
    loginUserController,
    getMeController,
    logoutController,
};
