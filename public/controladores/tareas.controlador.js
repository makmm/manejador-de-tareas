app.controller('TareasController', function($http, $log, $scope){
  var tareasCtrl = this;

  tareasCtrl.tareas = [];
  tareasCtrl.tab = 0;

  tareasCtrl.recargarTareas = function(){
    $http({
      method: 'GET',
      url: '/tareas.json',
      data: {},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }).then(function successCallback(response) {
      console.log(response.data);
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
    if(tarea.materia)
      tarea.materia = tarea.materia._id;
    else tarea.materia = tareasCtrl.materias[0]._id;

    $http({
      method: 'PATCH',
      url: '/editarTarea',
      data: tarea,
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }).then(function successCallback(response) {
      tarea.materia = tareasCtrl.materias.find(m => m._id.equals(ObjectID(tarea.materia)));
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
    tareasCtrl.nuevaTarea = {};
  };

  tareasCtrl.setearMateria = (tarea, materia) => {
    tarea.materia = materia;
  }

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

  tareasCtrl.recargarTareas();

});
