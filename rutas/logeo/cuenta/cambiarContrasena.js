module.exports = async (app) => {
  const contrasena = require('../../../utils/contrasena.js')
  const Usuario = require('../../../config/schemas/usuario.js')

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

        await Usuario.cambiarContrasena(req.body.contrasena)

        req.logout()
        res.json({
          status: "Contraseña cambiada."
        })
      } catch(e){
        throw e
      }
    })
}