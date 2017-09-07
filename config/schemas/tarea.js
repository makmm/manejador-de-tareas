const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const Materia = require('./materia.js')

let tareaSchema = mongoose.Schema({
  nombre: String,
  descripcion: String,
  materiaId: mongoose.Schema.Types.ObjectId
})

tareaSchema.virtual('materia').get(async function(){
  return await Materia.findById(this.materiaId)
})

tareaSchema.query.porMateria = function(materia){
  return this.findOne({materia: materia})
}

module.exports = mongoose.model('Tarea', tareaSchema)
