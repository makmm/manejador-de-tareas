const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const Topic = require('./topic.js')
let homeworkSchema = mongoose.Schema({
  name: String,
  description: String,
  topicId: mongoose.Schema.Types.ObjectId
})

homeworkSchema.virtual('topic').get(async function(){
  return await Topic.findById(this.topicId)
})

homeworkSchema.query.byTopic = function(topic){
  return this.findOne({topic: topic})
}

module.exports = mongoose.model('Homework', homeworkSchema)
