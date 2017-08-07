module.exports = async (app) => {
  const ObjectID = require('mongodb').ObjectID

  let db = await require('./utils/db.js')()

  app.get('/tareas.json', async (req, res) => {
    try {
      let tareas = await db.collection('tareas').find({}).toArray()
      const materias = await db.collection('materias').find({}).toArray()

      for (var i = 0; i < tareas.length; i++) {
        let tarea = tareas[i];
        tarea.materia = materias.find(m => m._id.equals(ObjectID(tarea.materia)))
      }

      res.send(tareas)
    } catch(e){
      throw e
    }
  })

  app.delete('/eliminarTarea', async (req, res) => {
    try {
      await db.collection('tareas').remove(
        {_id: ObjectID(req.body.id)}
      )

      res.send()
    } catch(e){
      throw e
    }
  });

  app.patch('/editarTarea', async (req, res) => {
    try {
      // Reemplazar la tarea con la nueva, editada (despues voy a hacer que solo cambie lo que se cambió)
      await db.collection('tareas').replaceOne({
        _id: ObjectID(req.body._id)
      }, req.body)

      res.send()
    } catch(e){
      throw e
    }
  })

  app.post('/crearTarea', async (req, res) => {
    try {
      const respuesta = await db.collection('tareas').insertOne(req.body)
      let tarea = respuesta.ops[0]

      tarea.materia = await db.collection('materias').findOne({
        _id: ObjectID(tarea.materia)
      })
      
      res.send(tarea)
    } catch(e){
      throw e
    }
  })

  app.get('/materias.json', async (req, res) => {
    try {
      const materias = await db.collection('materias').find().toArray()
      res.send(materias)
    } catch(e){
      throw e
    }
  })

  app.delete('/eliminarMateria', async (req, res) => {
    try {
      const materias = await db.collection('materias').remove({
        _id: ObjectID(req.body.id)
      })

      await db.collection('tareas').update({
        // Si alguna tarea tiene la materia eliminada...
        materia: {
          _id: ObjectID(req.body.id)
        }
      }, {
        // ...'unsetear' la materia (poner como undefined)
        $unset: {
          materia: true
        }
      })

      res.send()
    } catch(e){
      throw e
    }
  })

  app.patch('/editarMateria', async (req, res) => {
    try {
      req.body._id = ObjectID(req.body._id)
      // Reemplazar la tarea con la nueva, editada (despues voy a hacer que solo cambie lo que se cambió)
      await db.collection('materias').replaceOne({
        _id: ObjectID(req.body._id)
      }, req.body)

      res.send()
    } catch(e) {
      throw e
    }
  })

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
