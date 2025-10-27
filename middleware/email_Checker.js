const express = require("express");
const User_Model = require("../models/user.model");
let app = express();

app.use(express.json());

let Signup_emailChecker = async (req,res,next) => {
    if(!req.body.email){
       return res.status(400).json({msg:"Enter Your Email"})
    }
    else{
        let email_Result = await User_Model.findOne({email:req.body.email});
        
        if(email_Result){
            return res.status(401).json({msg:"Email Already Registered"})
        }
        else{
            next();
        }
    }
}


let Login_emailChecker = async (req,res,next) => {
    if(!req.body.email){
        return res.status(400).json({msg:"Enter Your Email"});
    }
    else{
        let email_Result = await User_Model.findOne({email:req.body.email});

        if(!email_Result){
            return res.status(404).json({msg:"User Not Found"});
        }
        else{
            next();
        }
    }
}

module.exports = {Signup_emailChecker, Login_emailChecker};