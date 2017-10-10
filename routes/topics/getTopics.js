module.exports = async (app) => {
  const Topic = require('../../config/schemas/topic.js')

  app.get('/topics.json', async (req, res) => {
    try {
      const topics = await Topic.find()
      res.send(topics)
    } catch(e){
      throw e
    }
  })
}
