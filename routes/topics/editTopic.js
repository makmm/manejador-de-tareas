module.exports = async (app) => {
  const Topic = require('../../config/schemas/topic.js')

  app.patch('/editTopic', async (req, res) => {
    try {
      await Topic.findById(req.body._id).replaceOne(req.body)
      res.send()
    } catch(e) {
      throw e
    }
  })
}
