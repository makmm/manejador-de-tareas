process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

// -------- CONFIG --------

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
