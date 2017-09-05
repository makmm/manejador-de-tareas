const mongoose = require('mongoose')

let materiaSchema = mongoose.Schema({
  nombre: String
})

module.exports = mongoose.model('Materia', materiaSchema)