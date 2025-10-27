const bcrypt = require("bcrypt")

const saltOnRound = 15

let encryptPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, saltOnRound)
}

let decryptPassword = async (plainPassword,hash) => {
    return await bcrypt.compare(plainPassword, hash);
}


module.exports = {encryptPassword,decryptPassword}