module.exports = async (app) => {
  const Topic = require('../../config/schemas/topic.js')
  const Homework = require('../../config/schemas/homework.js')

  app.delete('/deleteTopic', async (req, res) => {
    try {
      await Topic.remove({
        _id: req.body._id
      })

      // TODO: Eliminar la ID de la materia en las tareas aquí

      res.send()
    } catch(e){
      throw e
    }
  })
}
