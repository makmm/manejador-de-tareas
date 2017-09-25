app.controller('NavbarController', function($state, loginServicio, perfilServicio){
  let navbarCtrl = this

  navbarCtrl.estaLogeado = () => loginServicio.logeado
  navbarCtrl.conseguirPerfil = () => perfilServicio.perfil

  navbarCtrl.cerrarSesion = () => {
    loginServicio.eliminarSesion()
      .then(() => {
        $state.go('login')
      })
  }
})
