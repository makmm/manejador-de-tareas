module.exports = async (app) => {
  const passport = require('passport')

  app.get('/login/account',
    require('../../../utils/login.js').isLoggedIn,
    async (req, res) => {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        user: req.user.user,
        email: req.user.email
      })
    })
}
