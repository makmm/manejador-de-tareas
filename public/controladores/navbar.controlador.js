app.controller('NavbarController', function(loginServicio, perfilServicio){
  let navbarCtrl = this

  navbarCtrl.estaLogeado = () =>
    loginServicio.logeado
  navbarCtrl.conseguirPerfil = () =>
    perfilServicio.perfil

  navbarCtrl.eliminarSesion =
    loginServicio.eliminarSesion
})
