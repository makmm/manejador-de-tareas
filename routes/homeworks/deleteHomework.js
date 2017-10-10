module.exports = async (app) => {
  const Homework = require('../../config/schemas/homework.js')

  app.delete('/deleteHomework', async (req, res) => {
    try {
      await Homework.remove({
        _id: req.body._id
      })

      res.send()
    } catch(e){
      throw e
    }
  })
}
