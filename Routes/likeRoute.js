const express = require("express");
const requiredLogin = require("../middleware/requiredLogin");
const {likePost, unlikePost} = require("../Controller/likeController");

let route = express.Router();

route.put("/likePost", requiredLogin, likePost)
route.put("/unlikePost",requiredLogin, unlikePost)

module.exports = route;