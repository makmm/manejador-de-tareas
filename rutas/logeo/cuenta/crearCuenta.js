module.exports = async (app) => {
  let db = await require('../../../utils/db.js')()

  const hash = require('../../../utils/hash.js')

  app.post('/logeo/cuenta', async (req, res) => {
    const datosDeUsuario = req.body

    buscarOCrearUsuario = async () => {
      try {
        // Encontrar usuario en mongo
        let usuario = await db.collection('usuarios').findOne({
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
          await db.collection('usuarios').insertOne({
            nombre: datosDeUsuario.nombre,
            contrasena: hash.crearHash(datosDeUsuario.contrasena)
          })

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