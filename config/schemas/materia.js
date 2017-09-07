const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let materiaSchema = mongoose.Schema({
  nombre: String
})

module.exports = mongoose.model('Materia', materiaSchema)
