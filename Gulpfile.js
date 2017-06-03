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

  app.listen(8080, function(){
    console.log("[Express] Running on port 8080");
  });
});

gulp.task('default', ['mongo', 'express'], function(){

});
