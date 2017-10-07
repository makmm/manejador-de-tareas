app.controller('LoginController', function($http, $state, loginService){
  let loginCtrl = this

  loginCtrl.userBeingLoggedIn = {}
  loginCtrl.showAlert = false

  loginCtrl.logIn = (user) => {
    loginService.logIn(user.user, user.password)
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
