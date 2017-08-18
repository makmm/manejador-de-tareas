module.exports = async (app) => {
  let db = await require('../../utils/db.js')()
  
  app.post('/crearMateria', async (req, res) => {
    try {
     const respuesta = await db.collection('materias').insert(req.body)
     const materia = respuesta.ops[0]

     res.send(materia)
   } catch(e){
     throw e
   }
 })
}