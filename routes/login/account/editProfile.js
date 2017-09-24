module.exports = async (app) => {
  const User = require('../../../config/schemas/user.js')

  app.patch('/login/account',
    require('../../../utils/login.js').isLoggedIn,
    async (req, res) => {
      try {
        await User.find().updateOne({
          _id: req.body._id
        }, {
          $set: {
            name: req.body.name,
            lastname: req.body.lastname,
            user: req.body.user,
            email: req.body.email
          }
        })

        res.json({
          status: "Editado."
        })
      } catch(e){
        throw e
      }
    })
}
