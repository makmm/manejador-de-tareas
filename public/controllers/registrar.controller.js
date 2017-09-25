app.controller('RegistrarController', function($http, $state, loginServicio){
  let registrarCtrl = this

  registrarCtrl.usuarioSiendoRegistrado = {}
  registrarCtrl.mostrarAlerta = false
  registrarCtrl.tipoDeAlerta = ""

  registrarCtrl.registrar = () => {
    loginServicio.crearCuenta(registrarCtrl.usuarioSiendoRegistrado)
      .then(function successCallback(respuesta){
        $state.go('login')
      }, function errorCallback(respuesta){
        registrarCtrl.mostrarAlerta = true
        registrarCtrl.tipoDeAlerta = "danger"
        registrarCtrl.alerta = respuesta.data.error
      })
  }
})
