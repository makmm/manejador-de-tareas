app.controller('LoginController', function($http, $state, loginServicio){
  let loginCtrl = this

  loginCtrl.usuarioSiendoLogeado = {}
  loginCtrl.mostrarAlerta = false

  loginCtrl.login = (usuario) => {
    loginServicio.logearse(usuario.usuario, usuario.contrasena)
      .then((respuesta) => {
        $state.go('acercaDe') 
      }, (respuesta) => {
        loginCtrl.mostrarAlerta = true
        loginCtrl.tipoDeAlerta = "danger"
        if(respuesta.status == 401){
          loginCtrl.alerta = "Email/Usuario no encontrado o contraseña no valida"
        } else {
          loginCtrl.alerta = "Error desconocido..."
        }
      })
  }
})
