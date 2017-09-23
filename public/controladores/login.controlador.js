app.controller('LoginController', function($http, $state, loginServicio){
  let loginCtrl = this

  loginCtrl.usuarioSiendoLogeado = {}
  loginCtrl.mostrarAlerta = false

  loginCtrl.login = (usuario) => {
    const respuesta = loginServicio.logearse(usuario.usuario, usuario.contrasena)
    if(respuesta){
      loginCtrl.mostrarAlerta = true
      loginCtrl.tipoDeAlerta = "danger"
      if(respuesta.status == 401){
        loginCtrl.alerta = "Email/Usuario no encontrado o contraseña no valida"
      } else {
        loginCtrl.aleta = "Error desconocido..."
      }
    } else {
      $state.go('acercaDe')
    }
  }
})
