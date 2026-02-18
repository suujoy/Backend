const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const logginController = async (req, res) => {
    /**
     * Getting data fron req.body
     */
    const { username, password, email } = req.body;

    /**
     * find user based on email/ username
     */
    const user = await userModel.findOne({
        $or: [
            {
                email: email,
            },
            {
                username: username,
            },
        ],
    });

    /**
     * check if user already exist or not
     */
    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
        });
    }

    /**
     * convert password to hash
     */
    const isPasswordMatched =
        user.password ===
        crypto.createHash("md5").update(password).digest("hex");

    /**
     * check password
     */
    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Password",
        });
    }

    /**
     * Creating token
     */
    const token = jwt.sign(
        {
            id: user._id,
            email: user._email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );

    /**
     * sent token to the browser cookie Storage
     */
    res.cookie("token", token);

    res.status(200).json({
        message: "User Logged in",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage,
        },
        token,
    });
};

const registerControllar = async (req, res) => {
    /**
     * Getting Data from req.body
     */
    const { email, username, password, bio, profileImage } = req.body;

    /**
     * Find user based on email/username
     */
    const isUserExist = await userModel.findOne({
        $or: [
            {
                username: username,
            },
            {
                email: email,
            },
        ],
    });

    /**
     * check if User already exist in the database
     */
    if (isUserExist) {
        return res.status(409).json({
            message:
                "User already exist" +
                (isUserExist.email === email
                    ? "With this email"
                    : "Wtih this username"),
        });
    }

    /**
     * Creating hash for password protection
     */
    const hash = crypto.createHash("md5").update(password).digest("hex");

    /**
     * Creating User
     */

    const user = await userModel.create({
        email,
        password: hash,
        username,
        bio,
        profileImage,
    });

    /**
     * Token Creation
     */
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        },
    );

    /**
     * sent token to the browser cookie Storage
     */
    res.cookie("token", token);

    /**
     * Sent user created Response
     */

    res.status(201).json({
        message: "User Created",
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
    registerControllar,
    logginController,
};
