module.exports = async (app) => {
  const Tarea = require('../../config/schemas/tarea.js')

  app.delete('/eliminarTarea', async (req, res) => {
    try {
      await Tarea.find().remove({
        _id: req.body.id
      })
      res.send()
    } catch(e){
      throw e
    }
  })
}
