const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [{ email: email }, { username: username }],
    });

    if (isUserExist) {
        return res.status(409).json({
            message:
                "User is already Exist in the database" +
                (isUserExist.email ? "with this email" : "with this username"),
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
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
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User Registration Successfull",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
};

const loginController = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await userModel.findOne({
        $or: [{ email: email }, { username: username }],
    });

    if (!user) {
        return res.status(409).json({
            message: "User Not Found",
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

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
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
};

module.exports = {
    registerController,
    loginController,
};
