module.exports = async (app) => {
  const Usuario = require('../../../config/schemas/usuario.js')

  app.patch('/logeo/cuenta',
    require('../../../utils/login.js').estaLogeado,
    async (req, res) => {
      try {
        await Usuario.find().updateOne({
          _id: req.body._id
        }, {
          $set: {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            email: req.body.email
          }
        })

        res.json({
          status: "Editado."
        })
      } catch(e){
        throw e
      }
    })
}
