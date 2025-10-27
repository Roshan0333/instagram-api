const express = require("express");
const {addComment, editMyComment, deleteMyComment, getAllComments} = require("../Controller/commentController");
const requiredLogin = require("../middleware/requiredLogin");

let route = express.Router();

route.put("/addComment", requiredLogin, addComment);
route.post("/getAllComments", getAllComments);
route.put("/editMyComment", requiredLogin, editMyComment);
route.put("/deleteMyComment", requiredLogin, deleteMyComment);

module.exports = route;

