var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var bodyParser = require('body-parser');

var db;

gulp.task('mongo', function(){
  assert = require('assert');

  MongoClient.connect('mongodb://localhost:27017/manejador-de-tareas', (err, connectiondb) => {
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
    tareas = db.collection('tareas');

    tareas.find({ /* aca abria que poner la busqueda que quiere el usuario */ }).toArray((err, data) => {
      res.send(data);
    });
  });

  app.delete('/eliminarTarea', (req, res) => {
    tareas = db.collection('tareas');

    tareas.remove({_id: ObjectID(req.body.id)}, (err, result) => {
      if(err){
        res.send(err);
        return;
      }
      res.send(result);
    });    
  });

  app.post('/editarTarea', (req, res) => {
    console.log(req.body);

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

  app.listen(8080, function(){
    console.log("[Express] Running on port 8080");
  });
});

gulp.task('default', ['mongo', 'express'], function(){

});
