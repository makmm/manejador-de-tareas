module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()

  app.delete('/eliminarMateria', async (req, res) => {
    try {
      const materias = await db.collection('materias').remove({
        _id: ObjectID(req.body.id)
      })

      await db.collection('tareas').update({
        // Si alguna tarea tiene la materia eliminada...
        materia: {
          _id: ObjectID(req.body.id)
        }
      }, {
        // ...'unsetear' la materia (poner como undefined)
        $unset: {
          materia: true
        }
      })

      res.send()
    } catch(e){
      throw e
    }
  })
}