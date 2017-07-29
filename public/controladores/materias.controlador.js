app.controller('MateriasController', function($http){
  var materiasCtrl = this;

  materiasCtrl.materias = [];
  materiasCtrl.creando = false;
  materiasCtrl.materiaSiendoEditada = null;

  materiasCtrl.recargarMaterias = () => {
    $http({
      method: 'GET',
      url: '/materias.json',
      data: {},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }).then(function successCallback(response) {
      console.log(response.data)
      materiasCtrl.materias = response.data;
    }, function errorCallback(response) {
      /*
       * Hacer que aparece una alerta de
       * esas que te da bootstrap, con
       * un contador de 30seg de que va a
       * auto-reintentar, y un botón para
       * reintentar manualmente.
       */
    });
  };

  materiasCtrl.eliminarMateria = (materia) => {
    $http({
      method: 'DELETE',
      url: '/eliminarMateria',
      data: {id: materia._id},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }).then(function successCallback(response) {
      for(var i = materiasCtrl.materias.length - 1; i >= 0; i--) {
        if(materiasCtrl.materias[i] == materia){
          materiasCtrl.materias.splice(i, 1);
        }
      }
    }, function errorCallback(response) {
      /*
       * Boton de reintentar,
       * sin contador
       */
    });
  };

  materiasCtrl.empezarAEditarMateria = (materia) => {
    materiasCtrl.materiaSiendoEditada = materia;
  };

  materiasCtrl.toggleEdicionMateria = (materia) => {
    if(materiasCtrl.materiaSiendoEditada == materia)
      materiasCtrl.editarMateria(materia);
    else materiasCtrl.materiaSiendoEditada = materia;
  };

  materiasCtrl.editarMateria = (tarea) => {
    $http({
      method: 'PATCH',
      url: '/editarMateria',
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

    materiasCtrl.materiaSiendoEditada = null;
  };

  materiasCtrl.empezarNuevaMateria = (materia) => {
    materiasCtrl.creando = true;
    materiasCtrl.nuevaMateria = {};
  };

  materiasCtrl.anadirMateria = (materia) => {
    materiasCtrl.creando = false;

    $http({
      method: 'POST',
      url: '/crearMateria',
      data: materia,
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    }).then(function successCallback(response) {
      materiasCtrl.materias.push(response.data);
    }, function errorCallback(response) {
      /*
       * Boton de reintentar,
       * sin contador
       */
    });
  };

  materiasCtrl.recargarMaterias();
});
