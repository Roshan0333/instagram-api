const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'You must be Login', acknowledgement: false })
    }
    else {
        const token = authorization.replace("Bearer ", "");

        const jwtTokenVerifier = jwt.verify(token, "Welcome");

        req.user = jwtTokenVerifier.user;

        next();
    }
}