const mongoose = require('mongoose')

mongoose.Promise = global.Promise

let agendaSchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('Agenda', agendaSchema)
