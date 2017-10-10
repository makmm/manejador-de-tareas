module.exports = async (app) => {
  const Topic = require('../../config/schemas/topic.js')

  app.post('/createTopic', async (req, res) => {
    try {
      let newTopic = Topic()

      newTopic.name = req.body.name

      await newTopic.save()

      res.send(newTopic)
    } catch(e){
       throw e
    }
   })
}
