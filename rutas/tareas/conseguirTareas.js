module.exports = async (app) => {
  const Tarea = require('../../config/schemas/tarea.js')

  app.get('/tareas.json', async (req, res) => {
    try {
      let tareas = await Tarea.find()

      for(var i = 0; i < tareas.length; i++){
        // Sinceramente, no se por que esto es necesario.
        // pero me di cuenta de que materia era un Promise
        // Y funciona, así que ¯\_(ツ)_/¯
        tareas[i] = tareas[i].toObject({
          virtuals: true
        })
        tareas[i].materia = await tareas[i].materia
      }

      res.send(tareas)
    } catch(e){
      throw e
    }
  })
}
