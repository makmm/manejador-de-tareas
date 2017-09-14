module.exports = async (app) => {
  const passport = require('passport')
  const ObjectID = require('mongodb').ObjectID

  app.get('/logeo/cuenta',
    require('../../../utils/login.js').estaLogeado,
    async (req, res) => {
      res.json({
        nombre: req.user.nombre,
        apellido: req.user.apellido,
        usuario: req.user.usuario,
        email: req.user.email
      })
    })
}
