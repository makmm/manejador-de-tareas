module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()
  
  app.post('/crearTarea', async (req, res) => {
    try {
      // Crear tarea
      const respuesta = await db.collection('tareas').insertOne(req.body)
      // Conseguir la tarea recién creada
      let tarea = respuesta.ops[0]

      // Conseguir la materia de esa tarea
      // para devolver
      if(tarea.materia)
        tarea.materia = await db.collection('materias').findOne({
          _id: ObjectID(tarea.materia)
        })
      
      res.send(tarea)
    } catch(e){
      throw e
    }
  })
}