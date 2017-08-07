const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const figlet = require('figlet')
const morgan = require('morgan')

// -------- EXPRESS --------

const puerto = process.env.PORT || 8080;

express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(morgan('dev'));

require('./rutas.js')(app)

app.listen(puerto, () =>
  console.log("[Express] Iniciado en puerto " + puerto)
);

// -------- ASCII --------

figlet('manejador-de-tareas', (err, data) => {
  if(err){
      console.dir(err);
      return;
  }
  console.log(chalk.bgCyan.red("" +
    data + "\n" +
    "https://github.com/makmm/manejador-de-tareas"))
});
