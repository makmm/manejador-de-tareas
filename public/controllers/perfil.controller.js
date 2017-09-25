app.controller('PerfilController', function($scope, perfilServicio, loginServicio){
  let perfilCtrl = this

  perfilCtrl.perfil = {}

  perfilCtrl.loginServicio = loginServicio

  perfilCtrl.editando = false
	
  perfilCtrl.actualizarPerfil = () => {
    perfilServicio.actualizarPerfil()
      .then((respuesta) => {
        perfilCtrl.perfil = respuesta.data
      })
  }
  
  perfilCtrl.editarPerfil = (perfil) => {
    if(!(perfil.nombre && perfil.apellido) &&
       (perfil.nombre || perfil.apellido)){
      perfilCtrl.mostrarAlerta = true
      perfilCtrl.tipoDeAlerta = "danger"
      perfilCtrl.alerta = "Es necesario escribir el nombre y el apellido"

      perfilCtrl.editando = true
     
      return
    }

    if(!($scope.perfil.$valid)){
      perfilCtrl.mostrarAlerta = true
      perfilCtrl.tipoDeAlerta = "danger"
      perfilCtrl.alerta = "No es posible editar, perfil no valido. Mirar los datos que estan en rojo."

      perfilCtrl.editando = true
     
      return
    }

    perfilServicio.editarPerfil(perfil)
      .then((respuesta) => {
        perfilCtrl.perfil = perfil
        perfilCtrl.editando = false
      }, (respuesta) => {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  perfilCtrl.toggleEdicionPerfil = () => {
    if(perfilCtrl.editando)
      perfilCtrl.editarPerfil(perfilCtrl.perfil)
    else 
      perfilCtrl.editando = true
  }

  perfilCtrl.actualizarPerfil()
})
