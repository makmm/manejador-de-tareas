module.exports = async (app) => {
  const Usuario = require('../../../config/schemas/usuario.js')

  app.post('/logeo/cuenta', async (req, res) => {
    const datosDeUsuario = req.body

    buscarOCrearUsuario = async () => {
      try {
        // Encontrar usuario en mongo
        let usuario = await Usuario.findOne({
          nombre: datosDeUsuario.nombre
        })
        // si ya existe
        if(usuario){
          res.status(400).json({
            error: "Usuario ya existe."
          })
        } else {
          // Si NO hay un usuario igual
          // Crear cuenta
          let nuevoUsuario = Usuario()

          nuevoUsuario.nombre = datosDeUsuario.nombre
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