const express = require("express");
const PostModel = require("../models/post.model");

let app = express();
app.use(express.json());


const UploadPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        const post64 = req.file?req.file.buffer.toString("base64"):null;

        let UploadingPost = await PostModel({
            title,
            body:post64,
            postedBy: req.user._id
        })

        await UploadingPost.save();

        return res.status(200).json({ Acknowlegedment: true })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


const allMyPosts = async (req, res) => {
    try {
        let posterId = await req.user._id;
        console.log(posterId)
        let posts = await PostModel.find({ postedBy: posterId });

        if (!posts || posts.length === 0) {
            res.status(404).json({ msg: "Not Post Found" });
        }
        else {
            console.log(posts)
            res.status(200).json({ msg: "Access Granted", posts: posts });
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const getAllPosts = async (req, res) => {
    try {
        let allPosts = await PostModel.find();

        return res.status(200).json({ msg: "Access Granted", posts: allPosts })
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const deleteMyPost = async (req, res) => {
    try {
        let userId = await req.user._id;
        let postId = req.body.postId
        let postDetail = await PostModel.findOne({ _id: postId });
        let posterId = postDetail.postedBy;

        if (userId.toString() === posterId.toString()) {

            await PostModel.findByIdAndDelete({ _id: postId })
            return res.status(200).json({ msg: "Post Delete Successfully" });
        }
        else {
            return res.status(401).json({ msg: "Access Denied" })
        }
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = { UploadPost, allMyPosts, getAllPosts, deleteMyPost};