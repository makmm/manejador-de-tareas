const mongoose = require('mongoose')

const url = process.env.mongohost || "mongodb://localhost/manejador-de-tareas"

mongoose.Promise = global.Promise
//assert.equal(query.exec().constructor, global.Promise)

mongoose.connect(url, {
  useMongoClient: true
})

module.exports = async () => {
  return await mongoose.connection
}
