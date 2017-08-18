module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID

  let db = await require('../../utils/db.js')()

  app.patch('/editarTarea', async (req, res) => {
    delete req.body._id

    try {
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

