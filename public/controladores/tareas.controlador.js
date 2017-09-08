app.controller('TareasController', function($http, $scope){
  var tareasCtrl = this

  tareasCtrl.tareas = []
  tareasCtrl.creando = false
  tareasCtrl.tareaSiendoEditada = null

  tareasCtrl.recargarTareas = () => {
    $http.get('/tareas.json', {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(respuesta) {
        tareasCtrl.tareas = respuesta.data
      }, function errorCallback(respuesta) {
        /*
         * Hacer que aparece una alerta de
         * esas que te da bootstrap, con
         * un contador de 30seg de que va a
         * auto-reintentar, y un botón para
         * reintentar manualmente.
         */
      })

    $http.get('/materias.json', {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(respuesta) {
        tareasCtrl.materias = respuesta.data
      }, function errorCallback(respuesta) {
        /*
         * Hacer que aparece una alerta de
         * esas que te da bootstrap, con
         * un contador de 30seg de que va a
         * auto-reintentar, y un botón para
         * reintentar manualmente.
         */
      })
  }

  tareasCtrl.eliminarTarea = (tareaAEliminar) =>
    $http.delete('/eliminarTarea', {
      data: {_id: tareaAEliminar._id},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(respuesta) {
        tareasCtrl.tareas.splice(
          tareasCtrl.tareas.findIndex((tarea) => tarea == tareaAEliminar), 1
        )
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  tareasCtrl.empezarAEditarTarea = (tarea) =>
    tareasCtrl.tareaSiendoEditada = tarea

  tareasCtrl.toggleEdicionTarea = (tarea) => {
    if(tareasCtrl.tareaSiendoEditada == tarea)
      tareasCtrl.editarTarea(tarea)
    else
      tareasCtrl.empezarAEditarTarea(tarea)
  }

  tareasCtrl.terminarDeEditarTarea = () =>
    tareasCtrl.tareaSiendoEditada = null

  tareasCtrl.editarTarea = (tarea) => {
    if(tarea.materia){
      tarea.materiaId = tarea.materia._id
      delete tarea.materia
    }

    $http.patch('/editarTarea', tarea)
      .then(function successCallback(respuesta) {
        tarea.materia = tareasCtrl.materias.find(m => m._id == tarea.materiaId)
        tareasCtrl.terminarDeEditarTarea()
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  tareasCtrl.cambiarMateria = (tarea, materia) => {
    tarea.materiaId = materia._id
    delete tarea.materia

    $http.patch('/editarTarea', tarea)
      .then(function successCallback(respuesta) {
        tarea.materia = materia
        tareasCtrl.terminarDeEditarTarea()
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  tareasCtrl.empezarNuevaTarea = (tarea) =>
    tareasCtrl.creando = true

  tareasCtrl.setearMateria = (tarea, materia) => {
    tarea.materia = materia;
  }

  tareasCtrl.terminarDeCrearTarea = () => {
    tareasCtrl.creando = false
    tareasCtrl.nuevaTarea = {}
  }

  tareasCtrl.anadirTarea = (tarea) => {
    if(tarea.materia &&
      tarea.materia._id){
      tarea.materiaId = tarea.materia._id
      delete tarea.materia
    }

    $http.post('/crearTarea', tarea)
      .then(function successCallback(respuesta) {
        tareasCtrl.tareas.push(respuesta.data)
        tareasCtrl.terminarDeCrearTarea()
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  tareasCtrl.recargarTareas()
})
