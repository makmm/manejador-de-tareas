module.exports = async (app) => {
  const Homework = require('../../config/schemas/homework.js')

  app.post('/createHomework', async (req, res) => {
    try {
      let newHomework = Homework(req.body)

      await newHomework.save()

      newHomework = newHomework.toObject({
        virtuals: true
      })
      newHomework.topic = await newHomework.topic

      res.send(newHomework)
    } catch(e){
      throw e
    }
  })
}
