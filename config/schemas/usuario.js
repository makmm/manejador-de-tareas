const mongoose = require('mongoose')

let usuarioSchema = mongoose.Schema({
  nombre: String,
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

module.exports = mongoose.model('Usuario', usuarioSchema)