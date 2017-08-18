module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()

  app.get('/tareas.json', async (req, res) => {
    try {
      let tareas = await db.collection('tareas').find({}).toArray()
      const materias = await db.collection('materias').find({}).toArray()

      for(var i = 0; i < tareas.length; i++){
        let tarea = tareas[i];
        tarea.materia = materias.find(m => m._id.equals(ObjectID(tarea.materia)))
      }

      res.send(tareas)
    } catch(e){
      throw e
    }
  })
}