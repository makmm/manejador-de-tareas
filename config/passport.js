module.exports = async (app) => {
  let db = await require('../utils/db.js')()

  const ObjectID = require('mongodb').ObjectID

  const passport = require('passport')
  const LocalStrategy = require('passport-local').Strategy

  const hash = require('../utils/hash.js')

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const usuario = await db.collection('usuarios').findOne({
        _id: ObjectID(id)
      })
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
      let usuario = await db.collection('usuarios').findOne({
        nombre: nombre
      })

      if(!usuario)
        return done(null, false, {
          error: "El usuario o la contraseña es incorrecta."
        })

      if(!hash.compararContrasenas(contrasena, usuario.contrasena))
        return done(null, false, {
          error: "El usuario o la contraseña es incorrecta."
        })
      
      return done(null, usuario)
    } catch(e){
      return done(e)
    }
  }))
}