const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const PostScheme = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    like: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
    }]
})

let PostModel = mongoose.model("Post", PostScheme);

module.exports = PostModel;