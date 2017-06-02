var app;
var controller;

$(document).ready(function(){
  app = angular.module('manejador-de-tareas', []);

  app.controller('TareasController', ['$http', '$log', function($http, $log){
    var tareasCtrl = this;
    tareasCtrl.tareas = {};
    $http({
      method: 'GET',
      url: '/tareas.json'
    }).then(function successCallback(response) {
      tareasCtrl.tareas = response.data;
    }, function errorCallback(response) {
      /*
       * Hacer que aparece una alerta de
       * esas que te da bootstrap, con
       * un contador de 30seg de que va a
       * auto-reintentar, y un botón para
       * reintentar manualmente.
       */
    });

  }]);

});

function cargarTareas(){
  $.get({
    url: '/tareas.json',
    data: {}, // Aca hay que poner las tareas que queremos buscar
    success: (data) => {
      actualizarTareas(data);
    },
    error: (err) => {
      console.log(err);
      var errorTemplate = Handlebars.compile($("#template-error").html());
      $("main").html(errorTemplate({error: err}));
    }
  });
}

function actualizarTareas(tareas){
  var template = Handlebars.compile($("#template-tarea").html());
  for(var i in tareas){
    $("#tareas-body").append(template(tareas[i]));
  }
}

function reintentar(){
  $(this).remove();
  cargarTareas();
}
