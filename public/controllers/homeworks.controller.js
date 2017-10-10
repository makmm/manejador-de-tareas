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

  homeworksCtrl.startEditingHomework = (homework) =>
    homeworksCtrl.homeworkBeingEdited = homework

  homeworksCtrl.toggleEditHomework = (homework) => {
    if(homeworksCtrl.homeworkBeingEdited == homework)
      homeworksCtrl.editHomework(homework)
    else
      homeworksCtrl.startEditingHomework(homework)
  }

  homeworksCtrl.stopEditingHomework = () =>
    homeworksCtrl.homeworkBeingEdited = null

  homeworksCtrl.editHomework = (homework) => {
    if(homework.topic){
      homework.topicId = homework.topic._id
      delete homework.topic
    }

    $http.patch('/editHomework', homework)
      .then(function successCallback(response) {
        homework.topic = homeworksCtrl.topics.find(m => m._id == homework.topicId)
        homeworksCtrl.stopEditingHomework()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  homeworksCtrl.changeTopic = (homework, topic) => {
    homework.topicId = topic._id
    delete homework.topic

    $http.patch('/editHomework', homework)
      .then(function successCallback(response) {
        homework.topic = topic
        homeworksCtrl.stopEditingHomework()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  homeworksCtrl.startNewHomework = (homework) => {
    homeworksCtrl.creating = true
    homeworksCtrl.newHomework = {}
  }

  homeworksCtrl.setTopic = (homework, topic) => {
    homework.topic = topic
  }

  homeworksCtrl.stopCreatingHomework = () => {
    homeworksCtrl.creating = false
    homeworksCtrl.newHomework = {}
  }

  homeworksCtrl.addHomework = (homework) => {
    if(homework.topic &&
      homework.topic._id){
      homework.topicId = homework.topic._id
      delete homework.topic
    }

    $http.post('/createHomework', homework)
      .then(function successCallback(response) {
        homeworksCtrl.homeworks.push(response.data)
        homeworksCtrl.stopCreatingHomework()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })
  }

  homeworksCtrl.updateHomeworks()
})
