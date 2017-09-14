app.service('loginServicio', function($http, perfilServicio){
  let loginServicio = this

  loginServicio.logeado = false

  loginServicio.logearse = (usuario, contrasena) => {
    $http.post('/logeo/sesion', {
      usuario: usuario,
      contrasena: contrasena
    })
      .then(function successCallback(respuesta){
        loginServicio.logeado = true
        perfilServicio.actualizarPerfil()
      }, function errorCallback(respuesta){
        return respuesta
      })
  }

  loginServicio.checkearLogeado = () =>
    $http.get('/logeo/sesion')
      .then(function successCallback(respuesta){
        loginServicio.logeado = respuesta.data
        return loginServicio.logeado
      })

  loginServicio.recargarSesion = () => {
    loginServicio.checkearLogeado()
      .then(function(){
        if(loginServicio.logeado)
          perfilServicio.actualizarPerfil()
      })

  }

  loginServicio.eliminarSesion = () => {
    $http.delete('/logeo/sesion')
      .then(function successCallback(respuesta){
        perfilServicio.perfil = null
        loginServicio.logeado = false
      })
  }

  angular.element(document).ready(function(){
    loginServicio.recargarSesion()
  })

})
