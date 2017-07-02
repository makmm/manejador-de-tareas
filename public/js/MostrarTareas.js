var app;

(function(){
  app = angular.module('manejador-de-tareas', []);

  app.controller('TareasController', function($http, $log, $scope){
    var tareasCtrl = this;

    tareasCtrl.tareas = {};

    tareasCtrl.recargarTareas = function(){
      $http({
        method: 'GET',
        url: '/tareas.json',
        data: {},
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
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
    }

    tareasCtrl.eliminarTarea = (id) => {
      $http({
        method: 'DELETE',
        url: '/eliminarTarea',
        data: {id: id},
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
        // Chequear si funcionó
        console.log(response.data);
        tareasCtrl.recargarTareas();
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      });
    };

    tareasCtrl.recargarTareas();

  }]);

});