const jwt = require("jsonwebtoken")

let secretKey = "Welcome"

let jwtToken_Create = (user) => {
    return jwt.sign({user}, secretKey, {expiresIn : '24h'});
}

module.exports = jwtToken_Create;