module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../utils/db.js')()
  
  app.get('/materias.json', async (req, res) => {
    try {
      const materias = await db.collection('materias').find().toArray()
      res.send(materias)
    } catch(e){
      throw e
    }
  })
}