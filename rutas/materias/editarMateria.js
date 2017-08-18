module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()
  
  app.patch('/editarMateria', async (req, res) => {
    try {
      req.body._id = ObjectID(req.body._id)
      // Reemplazar la tarea con la nueva, editada (después voy a hacer que solo cambie lo que se cambió)
      await db.collection('materias').replaceOne({
        _id: ObjectID(req.body._id)
      }, req.body)

      res.send()
    } catch(e) {
      throw e
    }
  })
}