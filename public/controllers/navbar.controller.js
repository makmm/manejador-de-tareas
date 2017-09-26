app.controller('NavbarController', function($state, loginService, profileService){
  let navbarCtrl = this

  navbarCtrl.isLoggedIn = () => loginService.loggedIn
  navbarCtrl.conseguirPerfil = () => profileService.profile

  navbarCtrl.logOut = () => {
    loginService.deleteSession()
      .then(() => {
        $state.go('login')
      })
  }
})
