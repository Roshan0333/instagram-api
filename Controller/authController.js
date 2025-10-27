const express = require("express");
let User_Model = require("../models/user.model");
const {encryptPassword,decryptPassword} = require("../utliltes/bcryptPassword");
const jwtToken_Create = require("../utliltes/jwtToken");

let Signup =  async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        let User = await User_Model({
            name,
            email,
            password: await encryptPassword(password),
            phone
        });

        await User.save();

        res.status(200).json({ msg: "User Add Successfully" })
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }

}


let Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let User = await User_Model.findOne({ email: email });

        let permission = await decryptPassword(password, User.password)

        if (permission) {
            User.password = undefined;
            let token = jwtToken_Create(User)
            res.status(200).json({ msg: "Access Granted", Token : token})
        }
        else{
            res.status(401).json({msg:"Incorrect Password"})
        }
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

let LoginByToken = async (req,res) => {
    try{
        console.log(req.user)
        return res.status(200).json({acknowlegedment:true, msg: "Access Granted"})
    }
    catch(err){
        return res.status(401).json({msg:err.message})
    }
}


module.exports = {Signup, Login, LoginByToken};