var app;

(function(){
  app = angular.module('manejador-de-tareas', []);

  app.controller('TareasController', function($http, $log, $scope){
    var tareasCtrl = this;

    tareasCtrl.tareas = [];

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

      $http({
        method: 'GET',
        url: '/materias.json',
        data: {},
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
        tareasCtrl.materias = response.data;
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

    tareasCtrl.eliminarTarea = (tarea) => {
      for(var i = tareasCtrl.tareas.length - 1; i >= 0; i--) {
        if(tareasCtrl.tareas[i] == tarea){
          tareasCtrl.tareas.splice(i, 1);
        }
      }

      $http({
        method: 'DELETE',
        url: '/eliminarTarea',
        data: {id: tarea._id},
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
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

    tareasCtrl.toggleEdicionTarea = (tarea) => {
      if(tareasCtrl.tareaSiendoEditada == tarea)
        tareasCtrl.editarTarea(tarea);
      else tareasCtrl.tareaSiendoEditada = tarea;
    };

    tareasCtrl.editarTarea = (tarea) => {
      $http({
        method: 'PATCH',
        url: '/editarTarea',
        data: tarea,
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      });

      tareasCtrl.tareaSiendoEditada = null;
    };

    tareasCtrl.cambiarMateria = (tarea, materia) => {
      tarea.materia = materia._id;

      $http({
        method: 'PATCH',
        url: '/editarTarea',
        data: tarea,
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
        tarea.materia = materia;
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      });

      tareasCtrl.tareaSiendoEditada = null;
    };

    tareasCtrl.empezarNuevaTarea = (tarea) => {
      tareasCtrl.creando = true;
    };

    tareasCtrl.anadirTarea = (tarea) => {
      tareasCtrl.creando = false;

      if(tarea.materia)
        tarea.materia = tarea.materia._id;
      else tarea.materia = tareasCtrl.materias[0]._id;

      $http({
        method: 'POST',
        url: '/crearTarea',
        data: tarea,
        headers: {
          'Content-type': 'application/json;charset=utf-8'
        }
      }).then(function successCallback(response) {
        tareasCtrl.tareas.push(response.data);
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      });

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
