const express = require("express");
const requiredLogin = require("../middleware/requiredLogin");
const {Follow, Unfollow} = require("../Controller/followController")
let route = express.Router();

route.put("/follow", requiredLogin, Follow);
route.put("/Unfollow", requiredLogin, Unfollow);

module.exports = route;