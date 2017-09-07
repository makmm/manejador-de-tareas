const mongoose = require('mongoose')

mongoose.Promise = global.Promise

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

usuarioSchema.query.porNombre = function(nombre){
  return this.findOne({nombre: nombre})
}

module.exports = mongoose.model('Usuario', usuarioSchema)
