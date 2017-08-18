module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()
  
  app.post('/crearTarea', async (req, res) => {
    try {
      const respuesta = await db.collection('tareas').insertOne(req.body)
      let tarea = respuesta.ops[0]

      tarea.materia = await db.collection('materias').findOne({
        _id: ObjectID(tarea.materia)
      })
      
      res.send(tarea)
    } catch(e){
      throw e
    }
  })
}