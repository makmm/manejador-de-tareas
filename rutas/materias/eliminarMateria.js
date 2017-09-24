module.exports = async (app) => {
  const Materia = require('../../config/schemas/materia.js')
  const Tarea = require('../../config/schemas/tarea.js')

  app.delete('/eliminarMateria', async (req, res) => {
    try {
      await Materia.remove({
        _id: req.body._id
      })

      // TODO: Eliminar la ID de la materia en las tareas aquí

      res.send()
    } catch(e){
      throw e
    }
  })
}
