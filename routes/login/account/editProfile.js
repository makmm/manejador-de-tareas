module.exports = async (app) => {
  const User = require('../../../config/schemas/user.js')

  app.patch('/login/profile',
    require('../../../utils/login.js').isLoggedIn,
    async (req, res) => {
      try {
        const isConflicting = await User.isConflicting(req.body)
        if(isConflicting == "user"){
          res.status(409).json({
            error: "Alguien más esta usando ese usuario."
          })
        } else if(isConflicting == "email"){
          res.status(409).json({
            error: "Alguien más esta usando ese email."
          })
        } else {
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
        }
      } catch(e){
        throw e
      }
    })
}
