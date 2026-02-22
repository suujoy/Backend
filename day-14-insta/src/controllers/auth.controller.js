const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Register Controller
 */

const registerController = async (req, res) => {
    const { email, username, password, bio, profileImage } = req.body;

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

    const hash = bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        username,
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
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registered successfully",
    });
};

module.exports = registerController;
