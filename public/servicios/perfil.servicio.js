app.service('perfilServicio', function($http){
  var perfilServicio = this

  perfilServicio.perfil = {}

  perfilServicio.conseguirPerfil = () => {
    return $http.get('/logeo/cuenta')
  }

  perfilServicio.editarPerfil = (perfil) => {
    return $http.patch('/logeo/cuenta', perfil)
  }

  perfilServicio.actualizarPerfil = () => {
    const pedido = perfilServicio.conseguirPerfil()
    pedido.then((respuesta) => {
      perfilServicio.perfil = respuesta.data
    })
    return pedido
  }  
})
