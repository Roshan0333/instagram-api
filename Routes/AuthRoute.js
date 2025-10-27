const express = require("express");
const { Signup, Login, LoginByToken } = require("../Controller/authController");
const { Signup_emailChecker, Login_emailChecker } = require("../middleware/email_Checker");
const requiredLogin = require("../middleware/requiredLogin");

const route = express.Router();


route.post("/Signup", Signup_emailChecker, Signup);
route.post("/Login",Login_emailChecker, Login)

route.post("/LoginByToken",requiredLogin, LoginByToken);


module.exports = route;