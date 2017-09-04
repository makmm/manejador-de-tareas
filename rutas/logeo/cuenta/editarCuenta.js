module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../../utils/db.js')()

  app.patch('/logeo/cuenta',
    require('../../../utils/login.js').estaLogeado,
    async (req, res) => {
      try {
        await db.collection('usuarios').replaceOne({
          _id: req.user._id
        }, {
          nombre: req.body.nombre
        })

        res.json({
          status: "Editado."
        })
      } catch(e){
        throw e
      }
    })
}