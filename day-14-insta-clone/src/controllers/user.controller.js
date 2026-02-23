const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername,
    });

    if (!isFolloweeExist) {
        return res.status(409).json({
            message: "Followee User Not Exist",
        });
    }

    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "Followee and Follower Cant Be same",
        });
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
            follow: isAlreadyFollowing,
        });
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });

    res.status(201).json({
        message: `You are now Following ${followeeUsername}`,
        followRecord,
    });
};

const unfollowUserController = async (req, res) => {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });

    if(!isUserFollowing){
        return res.status(200).json({
            message:`User is not following this ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`you have unfollow this ${followeeUsername}`,
    })
};

module.exports = {
    followUserController,
    unfollowUserController
};
