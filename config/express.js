module.exports = () => {
  const puerto = process.env.PORT || 8080;

  const express = require('express')
  const path = require('path')
  const bodyParser = require('body-parser')
  const morgan = require('morgan')

  const passport = require('passport')
  const expressSession = require('express-session')

  let app = express()

  app.use(express.static(__dirname + './../public'))
  app.use(bodyParser.json())
  app.use(morgan('dev'))

  app.use(expressSession({
    secret: require('../config.js').secret_key,
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  require('../routes/index.js')(app)

  app.listen(puerto, () =>
    console.log("[Express] Iniciado en puerto " + puerto)
  )

  return app
}
