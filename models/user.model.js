const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

let User_Scheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    Follower:{
        type:ObjectId,
        ref:"User"
    },
    Following:{
        type:ObjectId,
        ref:"User"
    }
})

let Auth_Model = mongoose.model("User", User_Scheme);

module.exports = Auth_Model;