module.exports = async (app) => {
  const passport = require('passport')

  app.post('/logeo/sesion', 
    passport.authenticate('local'), 
    (req, res) => 
      res.status(200).json({
        status: "Logeado."
      }))
}