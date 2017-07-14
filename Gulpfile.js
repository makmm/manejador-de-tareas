var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var bodyParser = require('body-parser');
var chalk = require('chalk');
var figlet = require('figlet');

var db;

figlet('manejador-de-tareas', (err, data) => {
  if(err){
      console.dir(err);
      return;
  }
  console.log(chalk.bgCyan.red("" + 
    data + "\n" + 
    "https://github.com/makmm/manejador-de-tareas"))
});

gulp.task('mongo', function(){
  assert = require('assert');

  MongoClient.connect(process.env.mongohost, (err, connectiondb) => {
    assert.equal(null, err);

    db = connectiondb;
  });
});

gulp.task('express', function(){
  express = require('express');

  var app = express();

  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json());

  app.get('/tareas.json', (req, res) => {
    var tareas = [];
    
    db.collection('tareas').find(
      { /* aca abria que poner la busqueda que quiere el usuario */ }
    ).toArray()
    .then((response) => {
      tareas = response;

      var materias = [];
      
      for(var i = 0; i < tareas.length; i++) {
        materias.push(ObjectID(tareas[i].materia));
      }
      
      db.collection('materias').find(
        {_id: { $in: materias }}
      ).toArray()
      .then((materias) => {
        for(var i = 0; i < tareas.length; i++) {
          tareas[i].materia = materias.find(m => m._id.equals(ObjectID(tareas[i].materia)))
        }

        res.send(tareas);
      })
    });
  });

  app.get('/materias.json', (req, res) => {
    db.collection('materias').find({ /* aca abria que poner la busqueda que quiere el usuario */ }).toArray((err, data) => {
      res.send(data);
    });
  });

  app.delete('/eliminarTarea', (req, res) => {
    db.collection('tareas').remove({_id: ObjectID(req.body.id)}, (err, result) => {
      if(err){
        res.send(err);
        return;
      }
      res.send(result);
    });    
  });

  app.patch('/editarTarea', (req, res) => {
    // Reemplaza {_id: "id"} por {_id: ObjectID("id")} para que no de error
    // ya que no se puede cambiar la id
    objeto = req.body;
    objeto._id = ObjectID(req.body._id);

    try {
      // Reemplazar la tarea con la nueva, editada (despues voy a hacer que solo cambie lo que se cambió)
      db.collection('tareas').replaceOne({
        _id: objeto._id
      }, objeto);
    } catch(e) {
      console.log(e);
    }

    // Enviar -nada- para que el navegador no de timeout
    res.send();
  });

  app.post('/crearTarea', (req, res) => {
    objeto = req.body;
    delete objeto._id;

    try {
      db.collection('tareas').insert(objeto, {}, (err, tarea) => {
        res.send(tarea.ops[0]);
      });
    } catch(e) {
      console.log(e);
    }
  });

  port = process.env.PORT || 8080;

  app.listen(port, function(){
    console.log("[Express] Running on port " + port);
  });
});

gulp.task('default', ['mongo', 'express'], function(){

});
