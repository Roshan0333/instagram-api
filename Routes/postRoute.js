const express = require("express");
const multer = require("multer");
const requiredLogin = require("../middleware/requiredLogin");
const {UploadPost, allMyPosts, getAllPosts, deleteMyPost} = require("../Controller/postController");

let route = express.Router();


const storage = multer.memoryStorage();
const upload = multer({storage});

route.post("/uploadPost", upload.single("post"), requiredLogin, UploadPost)
route.post("/allMyPosts", requiredLogin, allMyPosts)
route.post("/getAllPosts", getAllPosts);
route.put("/deletePost", requiredLogin, deleteMyPost)

module.exports = route