module.exports = async (app) => {
  const Materia = require('../../config/schemas/materia.js')

  app.patch('/editarMateria', async (req, res) => {
    try {
      await Materia.findById(req.body._id).replaceOne(req.body)
      res.send()
    } catch(e) {
      throw e
    }
  })
}
