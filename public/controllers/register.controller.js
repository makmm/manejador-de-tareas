app.controller('RegisterController', function($http, $state, loginService){
  let registerCtrl = this

  registerCtrl.userBeingRegistered = {}
  registerCtrl.showAlert = false
  registerCtrl.alertType = ""

  registerCtrl.register = () => {
    loginService.createAccount(registerCtrl.userBeingRegistered)
      .then(function successCallback(response){
        $state.go('login')
      }, function errorCallback(response){
        registerCtrl.showAlert = true
        registerCtrl.alertType = "danger"
        registerCtrl.alert = response.data.error
      })
  }
})
