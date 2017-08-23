module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID

  let db = await require('../../utils/db.js')()

  app.patch('/editarTarea', async (req, res) => {
    try {
      // Convertir ids de las cosas a ObjectID
      // para que funcione bien
      req.body._id = ObjectID(req.body._id)

      // Reemplazar la tarea con la nueva, editada (despues voy a hacer que solo cambie lo que se cambió)
      await db.collection('tareas').replaceOne({
        _id: ObjectID(req.body._id)
      }, req.body)

      res.send()
    } catch(e){
      throw e
    }
  })
}

