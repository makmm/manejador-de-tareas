module.exports = async (app) => {
  const Usuario = require('./schemas/usuario.js')

  const passport = require('passport')
  const LocalStrategy = require('passport-local').Strategy

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await Usuario.findById(id)
      done(null, usuario)
    } catch(e){
      done(e)
    }
  })

  passport.use('local', new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'contrasena',
    passReqToCallback: true
  }, 
  async (req, nombre, contrasena, done) => {
    try {
      let usuario = await Usuario.findOne({
        nombre: nombre
      })

      if(!usuario)
        return done(null, false, {
          error: "El usuario o la contraseña es incorrecta."
        })

      if(!usuario.compararContrasenas(contrasena))
        return done(null, false, {
          error: "El usuario o la contraseña es incorrecta."
        })
      
      return done(null, usuario)
    } catch(e){
      return done(e)
    }
  }))
}