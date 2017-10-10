module.exports = async (app) => {
  const Homework = require('../../config/schemas/homework.js')

  app.get('/homeworks.json', async (req, res) => {
    try {
      let homeworks = await Homework.find()

      for(var i = 0; i < homeworks.length; i++){
        // Sinceramente, no se por que esto es necesario.
        // pero me di cuenta de que topic era un Promise
        // Y funciona, así que ¯\_(ツ)_/¯
        homeworks[i] = homeworks[i].toObject({
          virtuals: true
        })
        homeworks[i].topic = await homeworks[i].topic
      }

      res.send(homeworks)
    } catch(e){
      throw e
    }
  })
}
