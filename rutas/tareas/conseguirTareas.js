module.exports = async (app) => {
  const Tarea = require('../../config/schemas/tarea.js')

  app.get('/tareas.json', async (req, res) => {
    try {
      console.log("tareas: " + await Tarea.find())
      let tareas = await Tarea.find()

      for(var i = 0; i < tareas.length; i++){
        let tarea = tareas[i]
        tarea = tarea.toObject({
          virtuals: true
        })
        console.log(tarea)
      }

      res.send(tareas)
    } catch(e){
      throw e
    }
  })
}