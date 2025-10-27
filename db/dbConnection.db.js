const express = require("express");
const mongoose = require("mongoose");

let dbConnection = async () => {
    await   mongoose.connect("mongodb://127.0.0.1/instagram");
    console.log("DataBase Connect Successfully")
}

module.exports = dbConnection;