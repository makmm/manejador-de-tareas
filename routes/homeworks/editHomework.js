module.exports = async (app) => {
  const Homework = require('../../config/schemas/homework.js')

  app.patch('/editHomework', async (req, res) => {
    try {
      await Homework.find().replaceOne({
        _id: req.body._id
      }, req.body)
      res.send()
    } catch(e){
      throw e
    }
  })
}
