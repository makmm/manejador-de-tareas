module.exports = async (app) => {
  const Materia = require('../../config/schemas/materia.js')

  app.post('/crearMateria', async (req, res) => {
    try {
      let nuevaMateria = Materia()

      nuevaMateria.nombre = req.body.nombre

      await nuevaMateria.save()

      res.send(nuevaMateria)
    } catch(e){
       throw e
    }
   })
}
