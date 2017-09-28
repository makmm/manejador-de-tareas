app.controller('NavbarController', function($state, loginService, profileService){
  let navbarCtrl = this

  navbarCtrl.isLoggedIn = () => loginService.loggedIn
  navbarCtrl.getProfile = () => profileService.profile

  navbarCtrl.logOut = () => {
    loginService.deleteSession()
      .then(() => {
        $state.go('login')
      })
  }
})
