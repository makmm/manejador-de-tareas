const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const Topic = require('./topic.js')
const Agenda = require('./agenda.js')

let homeworkSchema = mongoose.Schema({
  name: String,
  description: String,
  topicId: mongoose.Schema.Types.ObjectId,
  agendaId: mongoose.Schema.Types.ObjectId
})

homeworkSchema.virtual('topic').get(async function(){
  return await Topic.findById(this.topicId)
})

homeworkSchema.virtual('agenda').get(async function(){
  return await Agenda.findById(this.agendaId)
})

homeworkSchema.query.byTopic = function(topic){
  return this.findOne({topic: topic})
}

homeworkSchema.query.byAgenda = function(agenda){
  return this.findOne({agenda: agenda})
}

module.exports = mongoose.model('Homework', homeworkSchema)
