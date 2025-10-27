const express = require("express");
const PostModel = require("../models/post.model");

let app = express();
app.use(express.json())


const addComment = async (req, res) => {
    try {
        let postedBy = await req.user._id;
        let { postId, comments } = req.body

        await PostModel.findByIdAndUpdate(
            { _id: postId },
            { $push: { comments: { text: comments, postedBy } } }
        )

        return res.status(200).json({ msg: "Comment Add Successfully" })

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllComments = async (req, res) => {
    try {
        let postId = req.body.postId
        let postDetail = await PostModel.findById({ _id: postId });
        let allComments = postDetail.comments;

        if (allComments.length === 0) {
            return res.status(400).json({ msg: "No Comment on this Post" })
        }
        else {
            return res.status(200).json({ comments: allComments })
        }
    }
    catch (err) {
        return res.status(500).json({msg:err.message})
    }
}

const editMyComment = async (req,res) => {
    let userId = req.user._id;
    const {postId,commentId, comments} = req.body;

    const postDetail = await PostModel.findById({_id:postId});

    const comment = postDetail.comments.id(commentId)

    if(userId.toString() === comment.postedBy.toString()){
        comment.text = comments;

        await postDetail.save()

        return res.status(200).json({msg: "Comment Update Succesfully"})
    }
    else{
        return res.status(401).json({msg: "Edit Denied"})
    }
}

const deleteMyComment = async (req,res) => {
    try{
        let userId = req.user._id;
        const {postId, commentId} = req.body;

        const postDetail = await PostModel.findById({_id:postId});

        let posterId = postDetail.comments.id(commentId).postedBy;

        if(userId.toString() === posterId.toString()){
            await PostModel.findByIdAndUpdate(
                {_id:postId},
                {$pull:{comments:{_id:commentId}}}
            )

            return res.status(200).json({msg:"Comment Delete Successfully"})
        }
        else{
            return res.status(401).json({error: "Access Denied"})
        }
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}

module.exports = { addComment, getAllComments, editMyComment, deleteMyComment}