const bCrypt = require('bcrypt-nodejs')

module.exports.compararContrasenas = (contrasena1, contrasena2) => {
  return bCrypt.compareSync(contrasena1, contrasena2)
}

module.exports.crearHash = (contrasena) => {
  return bCrypt.hashSync(contrasena, bCrypt.genSaltSync(10), null)
}