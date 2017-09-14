const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let usuarioSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  usuario: String,
  email: String,
  contrasena: String
})

// Uso `function()` ya que `() =>` no deja usar `this`
usuarioSchema.methods.cambiarContrasena = function(contrasena){
  const hash = require('../../utils/hash.js')

  this.contrasena = hash.crearHash(contrasena)

  return;
}

usuarioSchema.methods.compararContrasenas = function(contrasena){
  const hash = require('../../utils/hash.js')

  return hash.compararContrasenas(contrasena, this.contrasena)
}

usuarioSchema.query.porUsuario = function(usuario){
  return this.findOne({usuario: usuario})
}

usuarioSchema.query.porEmail = function(email){
  return this.findOne({email: email})
}

module.exports = mongoose.model('Usuario', usuarioSchema)
