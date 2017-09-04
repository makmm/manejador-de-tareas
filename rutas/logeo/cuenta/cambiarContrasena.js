module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID
  
  let db = await require('../../../utils/db.js')()

  const hash = require('../../../utils/hash.js')
  const contrasena = require('../../../utils/contrasena.js')

  app.patch('/logeo/cuenta/contrasena',
    require('../../../utils/login.js').estaLogeado,
    async (req, res) => {
      try {
        contrasenaValida = contrasena.contrasenaValida(req.body.contrasena)
        if(contrasenaValida instanceof Array)
          return res.status(400).json({
            error: "Contraseña no valida.",
            problemas: contrasenaValida
          })

        await db.collection('usuarios').replaceOne({
          _id: req.user._id
        }, {
          nombre: req.user.nombre,
          contrasena: hash.crearHash(req.body.contrasena)
        })

        req.logout()
        res.json({
          status: "Contraseña cambiada."
        })
      } catch(e){
        throw e
      }
    })
}