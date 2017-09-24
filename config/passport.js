module.exports = async (app) => {
  const User = require('./schemas/user.js')

  const passport = require('passport')
  const LocalStrategy = require('passport-local').Strategy

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await user.findById(id)
      done(null, user)
    } catch(e){
      done(e)
    }
  })

  passport.use('local', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      let user = await User.findOne({
        user: username
      })

      if(!user)
        return done(null, false, {
          error: "El usuario o la contraseña es incorrecta."
        })

      if(!user.comparePasswords(password))
        return done(null, false, {
          error: "El usuario o la contraseña es incorrecta."
        })

      return done(null, user)
    } catch(e){
      return done(e)
    }
  }))
}
