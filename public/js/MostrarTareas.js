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

    tareasCtrl.empezarAEditarTarea = (tarea) => {
      tareasCtrl.tareaSiendoEditada = tarea;
    };

    tareasCtrl.editarTarea = (tarea) => {
      console.log(tarea);
      $http({
        method: 'POST',
        url: '/editarTarea',
        data: tarea,
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
        tareasCtrl.recargarTareas();
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      });

      tareasCtrl.tareaSiendoEditada = null;
    };

    /*
    tareasCtrl.abrirEditarModal = function(tarea){
      instanciaModal = $uibModal.open({
        templateUrl: 'editarModalContent.html',
        controller: function($uibModal){
          console.log($uibModal);
          var modalCtrl = this;
          this.$onInit = function(){
            $uibModal.tarea = tarea;
            console.log($uibModal);

          };

          this.ok = function(){
            $uibModal.close(this.tarea);
          };

          this.cancel = function(){
            $uibModal.dismiss('cancel');
          };
        },
        tarea: tarea,
        resolve: {
          tarea: function(){
            console.log(tarea);
            return tarea;
          }
        }
      });
        instanciaModal.result.then(function(tarea){
          //$log.info(tarea);
        });
    };
    */

    tareasCtrl.recargarTareas();

  });

})();
