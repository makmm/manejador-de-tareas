module.exports = async (app) => {
  const User = require('../../../config/schemas/user.js')

  app.post('/login/account', async (req, res) => {
    const userData = req.body

    findOrCreateUser = async () => {
      try {
        let userByUser = await User.find().byUser(userData.user)
        let userByEmail = await User.find().byEmail(userData.email)
        
        if(userByUser){
          res.status(400).json({
            error: "Usuario ya existe."
          })
        } else if(userByEmail){
          res.status(400).json({
            error: "Email ya usado."
          })
        } else {
          let newUser = User(userData)

          newUser.changePassword(userData.password)

          await newUser.save()

          res.status(200).json({
            status: "Usuario creado."
          })
        }
      } catch(e){
        throw e
      }
    }

    process.nextTick(findOrCreateUser)
  })
}
