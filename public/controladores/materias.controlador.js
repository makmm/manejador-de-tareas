app.controller('MateriasController', function($http){
  var materiasCtrl = this;

  materiasCtrl.materias = []
  materiasCtrl.creando = false
  materiasCtrl.materiaSiendoEditada = null

  materiasCtrl.recargarMaterias = () =>
    $http.get('/materias.json')
      .then(function successCallback(respuesta) {
        materiasCtrl.materias = respuesta.data
      }, function errorCallback(respuesta) {
        /*
         * Hacer que aparece una alerta de
         * esas que te da bootstrap, con
         * un contador de 30seg de que va a
         * auto-reintentar, y un botón para
         * reintentar manualmente.
         */
      })

  materiasCtrl.eliminarMateria = (materiaAEliminar) =>
    $http.delete('/eliminarMateria', {
      data: {_id: materiaAEliminar._id},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(respuesta) {
        materiasCtrl.materias.splice(
          materiasCtrl.materias.findIndex((materia) => materia == materiaAEliminar), 1
        )
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  materiasCtrl.empezarAEditarMateria = (materia) =>
    materiasCtrl.materiaSiendoEditada = materia

  materiasCtrl.toggleEdicionMateria = (materia) => {
    if(materiasCtrl.materiaSiendoEditada == materia)
      materiasCtrl.editarMateria(materia)
    else
      materiasCtrl.empezarAEditarMateria(materia)
  }

  materiasCtrl.terminarDeEditarMateria = () =>
    materiasCtrl.materiaSiendoEditada = null

  materiasCtrl.editarMateria = (materia) =>
    $http.patch('/editarMateria', materia)
      .then(function successCallback(respuesta) {
        materiasCtrl.terminarDeEditarMateria()
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  materiasCtrl.empezarNuevaMateria = (materia) =>
    materiasCtrl.creando = true

  materiasCtrl.terminarDeCrearMateria = () => {
    materiasCtrl.creando = false
    materiasCtrl.nuevaMateria = {}
  }

  materiasCtrl.anadirMateria = (materia) =>
    $http.post('/crearMateria', materia)
      .then(function successCallback(respuesta) {
        materiasCtrl.materias.push(respuesta.data)
        materiasCtrl.terminarDeCrearMateria()
      }, function errorCallback(respuesta) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  materiasCtrl.recargarMaterias()
})
