process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

// -------- CONFIG --------

const fs = require('fs')

if(!fs.existsSync('./config.js')){
  console.log("[manejador-de-tareas] [ERROR] No hay un config.js!\n" +
    "Por favor, leer README.md.")
  return
}

require('./config/db.js')()
let app = require('./config/express.js')()
require('./config/passport.js')(app)

// -------- ASCII --------

const chalk = require('chalk')
const figlet = require('figlet')

figlet('manejador-de-tareas', (err, data) => {
  if(err){
      console.dir(err)
      return
  }
  console.log(chalk.bgCyan.red("" +
    data + "\n" +
    "https://github.com/makmm/manejador-de-tareas"))
});
