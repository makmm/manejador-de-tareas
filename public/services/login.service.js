app.service('loginServicio', function($http, perfilServicio){
  let loginServicio = this

  loginServicio.logeado = false

  loginServicio.logearse = (usuario, contrasena) =>
    $http.post('/logeo/sesion', {
      usuario: usuario,
      contrasena: contrasena
    })
      .then((respuesta) => {
        loginServicio.logeado = true
        perfilServicio.actualizarPerfil()
      })

  loginServicio.checkearLogeado = () =>
    $http.get('/logeo/sesion')
      .then((respuesta) => {
        loginServicio.logeado = respuesta.data
      })

  loginServicio.recargarSesion = () =>
    loginServicio.checkearLogeado()
      .then(function(){
        if(loginServicio.logeado)
          perfilServicio.actualizarPerfil()
      })

  loginServicio.eliminarSesion = () =>
    $http.delete('/logeo/sesion')
      .then((respuesta) => {
        // TODO: Ignorar si da un error
        perfilServicio.perfil = null
        loginServicio.logeado = false
      })

  loginServicio.crearCuenta = (cuenta) =>
    $http.post('/logeo/cuenta', cuenta)

  angular.element(document).ready(() => {
    loginServicio.recargarSesion()
  })

})
