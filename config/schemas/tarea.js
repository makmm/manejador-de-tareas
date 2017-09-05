const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID

const Materia = require('./materia.js')

let tareaSchema = mongoose.Schema({
  nombre: String,
  descripcion: String,
  materiaId: mongoose.Schema.Types.ObjectId
})

tareaSchema.virtual('materia').get(async function(){
  const materia = await Materia.findById(this.materiaId)
  console.log("Materia encontrada: " + materia)
  return materia
})


module.exports = mongoose.model('Tarea', tareaSchema)