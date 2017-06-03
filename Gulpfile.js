var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var mongodb = require('mongodb');
var Mondb;

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

  app.get('/tareas.json', (request, response) => {
    tareas = db.collection('tareas');

    tareas.find({ /* aca abria que poner la busqueda que quiere el usuario */ }).toArray((err, data) => {
      response.send(data);
    });
  });

  app.listen(8080, function(){
    console.log("[Express] Running on port 8080");
  });
});

gulp.task('default', ['mongo', 'express'], function(){

});
