app.controller('LoginController', function($http, $state, loginService){
  let loginCtrl = this

  loginCtrl.userBeingLoggedIn = {}
  loginCtrl.showAlert = false

  loginCtrl.login = (usuario) => {
    loginService.logearse(usuario.usuario, usuario.contrasena)
      .then((response) => {
        $state.go('aboutUs') 
      }, (response) => {
        loginCtrl.showAlert = true
        loginCtrl.alertType = "danger"
        if(response.status == 401){
          loginCtrl.alert = "Email/Usuario no encontrado o contraseña no valida"
        } else {
          loginCtrl.alert = "Error desconocido..."
        }
      })
  }
})
