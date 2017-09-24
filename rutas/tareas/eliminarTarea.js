module.exports = async (app) => {
  const Tarea = require('../../config/schemas/tarea.js')

  app.delete('/eliminarTarea', async (req, res) => {
    try {
      await Tarea.remove({
        _id: req.body._id
      })

      res.send()
    } catch(e){
      throw e
    }
  })
}
