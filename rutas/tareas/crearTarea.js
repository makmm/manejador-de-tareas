module.exports = async (app) => {
  const Tarea = require('../../config/schemas/tarea.js')

  app.post('/crearTarea', async (req, res) => {
    try {
      let nuevaTarea = Tarea(req.body)
      console.log(nuevaTarea)

      await nuevaTarea.save()

      // Conseguir la materia de esa tarea para devolver
      nuevaTarea = nuevaTarea.toObject({
        virtuals: true
      })
      nuevaTarea.materia = await nuevaTarea.materia

      res.send(nuevaTarea)
    } catch(e){
      throw e
    }
  })
}
