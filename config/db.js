module.exports = () => {
  const mongoose = require('mongoose')

  const url = process.env.mongohost || "mongodb://localhost/manejador-de-tareas"

  mongoose.Promise = global.Promise

  mongoose.connect(url, {
    useMongoClient: true
  })
}
