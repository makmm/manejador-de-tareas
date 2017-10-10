const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let topicSchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Topic', topicSchema)
