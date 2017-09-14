module.exports = () => {
  const mongoose = require('mongoose')

  const url = require('../config.js').mongo_host || "mongodb://localhost/manejador-de-tareas"

  mongoose.Promise = global.Promise

  mongoose.connect(url, {
    useMongoClient: true
  })
}
