const bCrypt = require('bcrypt-nodejs')

module.exports.comparePasswords = (password1, password2) => {
  return bCrypt.compareSync(password1, password2)
}

module.exports.createHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}
