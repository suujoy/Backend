const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
    /**
     * Getting followee username and follower username
     */

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    /**
     * check if the Followee user exist in the database
     */
    const isUserExist = await userModel.findOne({
        username: followeeUsername,
    });

    if (!isUserExist) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    /**
     * check if the followerUsername and followeeUsername are same or not
     */
    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "Followee and follower cant be same",
        });
    }

    /**
     * check if already following or not
     */

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: "User is already following",
        });
    }

    /**
     * create a follow request in the database
     */

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    /***
     * Sending response
     */
    res.status(201).json({
        message: `Loggin user is followed ${followeeUsername}`,
        followRecord,
    });
};

const unfollowUserController = async (req, res) => {
    /**
     * Getting User data
     * Follower Username
     * Followee Username
     */

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    /**
     * Check follow record exists or not
     */
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (!isAlreadyFollowing) {
        return res.status(400).json({
            message: `user is not a follower of ${followeeUsername}`,
        });
    }

    await followModel.findByIdAndDelete(isAlreadyFollowing._id);

    res.status(200).json({
        message: `You successfully unfollow the user ${followeeUsername}`,
    });
};

module.exports = { followUserController,unfollowUserController };
