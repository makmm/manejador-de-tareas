module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()

  app.delete('/eliminarTarea', async (req, res) => {
    try {
      await db.collection('tareas').remove({
        _id: ObjectID(req.body.id)
      })

      res.send()
    } catch(e){
      throw e
    }
  })
}