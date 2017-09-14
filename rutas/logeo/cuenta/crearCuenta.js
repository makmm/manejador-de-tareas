module.exports = async (app) => {
  const Usuario = require('../../../config/schemas/usuario.js')

  app.post('/logeo/cuenta', async (req, res) => {
    const datosDeUsuario = req.body

    buscarOCrearUsuario = async () => {
      try {
        // Encontrar usuario en mongo
        let usuarioPorUsuario = await Usuario.find().porUsuario(datosDeUsuario.usuario)
        let usuarioPorEmail = await Usuario.find().porEmail(datosDeUsuario.email)
        // si ya existe
        if(usuarioPorUsuario){
          res.status(400).json({
            error: "Usuario ya existe."
          })
        } else if(usuarioPorEmail){
          res.status(400).json({
            error: "Email ya usado."
          })
        } else {
          // Si NO hay un usuario igual
          // Crear cuenta
          let nuevoUsuario = Usuario(datosDeUsuario)

          nuevoUsuario.cambiarContrasena(datosDeUsuario.contrasena)

          await nuevoUsuario.save()

          res.status(200).json({
            status: "Usuario creado."
          })
        }
      } catch(e){
        throw e
      }
    }

    process.nextTick(buscarOCrearUsuario)
  })
}
