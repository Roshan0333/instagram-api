const express = require("express");
const PostModel = require("../models/post.model");

let app = express();
app.use(express.json())


const likePost = async (req, res) => {
    try {
        let userId = await req.user._id;
        let postId = req.body.postId;

        await PostModel.findByIdAndUpdate(
            { _id: postId },
            { $addToSet: { like: userId } }
        )

        return res.status(200).json({ msg: "Like Update Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


const unlikePost = async (req, res) => {
    try {
        let userId = await req.user._id;
        let postId = req.body.postId;

        await PostModel.findByIdAndUpdate(
            { _id: postId },
            { $pull: { like: userId } }
        )

        return res.status(200).json({ msg: "Like Update Successfully" })

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


module.exports = { likePost, unlikePost }