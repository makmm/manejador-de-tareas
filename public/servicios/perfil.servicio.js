app.service('perfilServicio', function($http){
  var perfilServicio = this

  perfilServicio.perfil = null

  perfilServicio.actualizarPerfil = () => {
    $http.get('/logeo/cuenta', {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(respuesta){
        perfilServicio.perfil = respuesta.data
        return
      })
  }
})
