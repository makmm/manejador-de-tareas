var fs = require('fs'),
    gulp = require('gulp'),
    path = require('path');

gulp.task('express', function(){
  express = require('express');

  var app = express();

  app.use(express.static(__dirname + '/public'));

  app.listen(8080, function(){
    console.log("[Express] Running on port 8080");
  });
});

gulp.task('default', ['express'], function(){

});
