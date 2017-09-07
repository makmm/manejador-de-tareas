module.exports = async (app) => {
  const Tarea = require('../../config/schemas/tarea.js')

  app.patch('/editarTarea', async (req, res) => {
    try {
      await Tarea.find().replaceOne({
        _id: req.body._id
      }, req.body)
      res.send()
    } catch(e){
      throw e
    }
  })
}
