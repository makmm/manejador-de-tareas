app.service('loginService', function($http, profileService){
  let loginService = this

  loginService.loggedIn = false

  loginService.logIn = (user, password) =>
    $http.post('/login/session', {
      user: user,
      password: password
    })
      .then((response) => {
        loginService.loggedIn = true
        profileService.updateProfile()
      })

  loginService.checkLoggedIn = () =>
    $http.get('/login/session')
      .then((response) => {
        loginService.loggedIn = response.data
      })

  loginService.reloadSession = () =>
    loginService.checkLoggedIn()
      .then(function(){
        if(loginService.loggedIn)
          profileService.updateProfile()
      })

  loginService.deleteSession = () =>
    $http.delete('/login/session')
      .then((response) => {
        // TODO: Ignorar si da un error
        profileService.profile = null
        loginService.loggedIn = false
      })

  loginService.createAccount = (account) =>
    $http.post('/login/account', account)

  angular.element(document).ready(() => {
    loginService.reloadSession()
  })

})
