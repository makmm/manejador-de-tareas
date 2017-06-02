var fs = require('fs'),
    gulp = require('gulp'),
    path = require('path');

var db;

gulp.task('mongo', function(){
  mongodb = require('mongodb');
  MongoClient = mongodb.MongoClient;

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
