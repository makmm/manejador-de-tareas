//Hay que arreglar esos errores y que hay que separar las funciones de hash

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

// -------- CONFIG --------

let app = require('./config/express.js')()
require('./config/passport.js')(app)

// -------- ASCII --------

const chalk = require('chalk')
const figlet = require('figlet')

figlet('manejador-de-tareas', (err, data) => {
  if(err){
      console.dir(err);
      return;
  }
  console.log(chalk.bgCyan.red("" +
    data + "\n" +
    "https://github.com/makmm/manejador-de-tareas"))
});
