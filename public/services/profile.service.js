app.service('profileService', function($http){
  var profileService = this

  profileService.perfil = {}

  profileService.getProfile = () => {
    return $http.get('/login/profile')
  }

  profileService.editProfile = (profile) => {
    return $http.patch('/login/profile', profile)
  }

  profileService.updateProfile = () => {
    const request = profileService.getProfile()
    request.then((response) => {
      profileService.profile = response.data
    })
    return request
  }  
})
