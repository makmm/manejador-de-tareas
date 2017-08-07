const MongoClient = require('mongodb').MongoClient

const url = process.env.mongohost || "mongodb://localhost/manejador-de-tareas"

module.exports = async () => {
  return await MongoClient.connect(url)
}
