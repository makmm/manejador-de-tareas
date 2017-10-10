module.exports = async (app) => {
  const password = require('../../../utils/password.js')
  const User = require('../../../config/schemas/user.js')

  app.patch('/login/account/password',
    require('../../../utils/login.js').isLoggedIn,
    async (req, res) => {
      try {
        validPassword = password.validPassword(req.body.password)
        if(validPassword instanceof Array)
          return res.status(400).json({
            error: "Contraseña no valida.",
            problemas: validPassword
          })

        await User.changePassword(req.body.password)

        req.logout()
        res.json({
          status: "Contraseña cambiada."
        })
      } catch(e){
        throw e
      }
    })
}
