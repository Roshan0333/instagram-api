const express = require("express");
const UserModel = require("../models/user.model");

let app = express();

app.use(express.json());

const Follow = async (req, res) => {
    try {
        let FollowId = req.body.followId;
        console.log(`FollowId=${FollowId}`)
       let result = await UserModel.findByIdAndUpdate({_id:FollowId},
            {$push:{Follower:req.user._id}}
        )

        let result1 = await UserModel.findByIdAndUpdate({_id:req.user._id},
            {$push:{Following:FollowId}}
        )

        console.log(`Result=${result}`)
        console.log(`Result1=${result1}`)
        console.log(`Req User=${req.user._id}`)
        res.status(200).json({msg:"Following Update Successfully"})
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const Unfollow = async (req, res) => {
    try {
        let followId = req.body.followId;

        await UserModel.findByIdAndUpdate({ UserId: followId },
            { $pull: { Follower: req.user._id } }
        )

        await UserModel.findByIdAndUpdate({ UserId: req.user._id },
            { $push: { Following: followId } }
        )

        res.status(200).json({ message: "Following Update Successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { Follow, Unfollow };