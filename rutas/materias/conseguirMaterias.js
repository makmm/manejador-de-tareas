module.exports = async (app) => {
  const Materia = require('../../config/schemas/materia.js')

  app.get('/materias.json', async (req, res) => {
    try {
      const materias = await Materia.find()
      res.send(materias)
    } catch(e){
      throw e
    }
  })
}
