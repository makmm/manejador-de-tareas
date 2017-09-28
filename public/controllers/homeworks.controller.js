app.controller('HomeworksController', function($http, $scope){
  var homeworksCtrl = this

  homeworksCtrl.homeworks = []
  homeworksCtrl.creating = false
  homeworksCtrl.homeworkBeingEdited = null

  homeworksCtrl.updateHomeworks = () => {
    $http.get('/homeworks.json', {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(response) {
        homeworksCtrl.homeworks = response.data
      }, function errorCallback(response) {
        /*
         * Hacer que aparece una alerta de
         * esas que te da bootstrap, con
         * un contador de 30seg de que va a
         * auto-reintentar, y un botón para
         * reintentar manualmente.
         */
      })

    $http.get('/topics.json', {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(response) {
        homeworksCtrl.topics = response.data
      }, function errorCallback(response) {
        /*
         * Hacer que aparece una alerta de
         * esas que te da bootstrap, con
         * un contador de 30seg de que va a
         * auto-reintentar, y un botón para
         * reintentar manualmente.
         */
      })
  }

  homeworksCtrl.deleteHomework = (homeworkBeingDeleted) =>
    $http.delete('/deleteHomework', {
      data: {_id: homeworkBeingDeleted._id},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(response) {
        homeworksCtrl.homeworks.splice(
          homeworksCtrl.homeworks.findIndex((homework) => homework == homeworkBeingDeleted), 1
        )
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  homeworksCtrl.empezarAEditarHomework = (homework) =>
    homeworksCtrl.homeworkSiendoEditada = homework

  homeworksCtrl.toggleEdicionHomework = (homework) => {
    if(homeworksCtrl.homeworkSiendoEditada == homework)
      homeworksCtrl.editarHomework(homework)
    else
      homeworksCtrl.empezarAEditarHomework(homework)
  }

  homeworksCtrl.terminarDeEditarHomework = () =>
    homeworksCtrl.homeworkSiendoEditada = null

  homeworksCtrl.editarHomework = (homework) => {
    if(homework.topic){
      homework.topicId = homework.topic._id
      delete homework.topic
    }

    $http.patch('/editarHomework', homework)
      .then(function successCallback(response) {
        homework.topic = homeworksCtrl.topics.find(m => m._id == homework.topicId)
        homeworksCtrl.terminarDeEditarHomework()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  homeworksCtrl.cambiarMateria = (homework, topic) => {
    homework.topicId = topic._id
    delete homework.topic

    $http.patch('/editarHomework', homework)
      .then(function successCallback(response) {
        homework.topic = topic
        homeworksCtrl.terminarDeEditarHomework()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  homeworksCtrl.empezarNuevaHomework = (homework) =>
    homeworksCtrl.creando = true

  homeworksCtrl.setearMateria = (homework, topic) => {
    homework.topic = topic;
  }

  homeworksCtrl.terminarDeCrearHomework = () => {
    homeworksCtrl.creando = false
    homeworksCtrl.nuevaHomework = {}
  }

  homeworksCtrl.anadirHomework = (homework) => {
    if(homework.topic &&
      homework.topic._id){
      homework.topicId = homework.topic._id
      delete homework.topic
    }

    $http.post('/crearHomework', homework)
      .then(function successCallback(response) {
        homeworksCtrl.homeworks.push(response.data)
        homeworksCtrl.terminarDeCrearHomework()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  homeworksCtrl.recargarHomeworks()
})
