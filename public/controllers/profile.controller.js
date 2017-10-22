app.controller('ProfileController', function($scope, profileService, loginService){
  let profileCtrl = this

  profileCtrl.profile = {}

  profileCtrl.loginService = loginService

  profileCtrl.editing = false

  profileCtrl.updateProfile = () => {
    profileService.updateProfile()
      .then((response) => {
        profileCtrl.profile = response.data
      })
  }

  profileCtrl.editProfile = (profile) => {
    if(!(profile.name && profile.lastname) &&
       (profile.name || profile.lastname)){
      profileCtrl.showAlert = true
      profileCtrl.typeOfAlert = "danger"
      profileCtrl.alert = "Es necesario escribir el nombre y el apellido"

      profileCtrl.editing = true

      return
    }

    if(!($scope.profile.$valid)){
      profileCtrl.showAlert = true
      profileCtrl.typeOfAlert = "danger"
      profileCtrl.alert = "No es posible editar, perfil no valido. Mirar los datos que estan en rojo."

      profileCtrl.editing = true

      return
    }

    profileService.editProfile(profile)
      .then((response) => {
        profileCtrl.profile = profile
        profileCtrl.editing = false
      }, (response) => {
        profileCtrl.showAlert = true
        profileCtrl.typeOfAlert = "danger"
        profileCtrl.alert = response.data.error

        profileCtrl.editing = true
      })
  }

  profileCtrl.toggleProfileEditing = () => {
    if(profileCtrl.editing)
      profileCtrl.editProfile(profileCtrl.profile)
    else
      profileCtrl.editing = true
  }

  profileCtrl.updateProfile()
})
