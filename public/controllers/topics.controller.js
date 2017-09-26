app.controller('TopicsController', function($http){
  var topicsCtrl = this

  topicsCtrl.topics = []
  topicsCtrl.creating = false
  topicsCtrl.topicBeingCreated = null

  topicsCtrl.updateTopics = () =>
    $http.get('/topics.json')
      .then(function successCallback(response) {
        topicsCtrl.topics = response.data
      }, function errorCallback(response) {
        /*
         * Hacer que aparece una alerta de
         * esas que te da bootstrap, con
         * un contador de 30seg de que va a
         * auto-reintentar, y un botón para
         * reintentar manualmente.
         */
      })

  topicsCtrl.deleteTopic = (topicBeingDeleted) =>
    $http.delete('/deleteTopic', {
      data: {_id: topicBeingDeleted._id},
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function successCallback(response) {
        topicsCtrl.topics.splice(
          topicsCtrl.topics.findIndex((topic) => topic == topicBeingDeleted), 1
        )
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  topicsCtrl.startToEditTopic = (topic) =>
    topicsCtrl.topicBeingEdited = topic

  topicsCtrl.toggleEditTopic = (topic) => {
    if(topicsCtrl.topicBeingEdited == topic)
      topicsCtrl.editTopic(topic)
    else
      topicsCtrl.startToEditTopic(topic)
  }

  topicsCtrl.stopEditingTopic = () =>
    topicsCtrl.topicBeingEdited = null

  topicsCtrl.editTopic = (topic) =>
    $http.patch('/editTopic', topic)
      .then(function successCallback(response) {
        topicsCtrl.stopEditingTopic()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  topicsCtrl.startNewTopic = (topic) =>
    topicsCtrl.creating = true

  topicsCtrl.stopCreatingTopic = () => {
    topicsCtrl.creating = false
    topicsCtrl.newTopic = {}
  }

  topicsCtrl.addTopic = (topic) =>
    $http.post('/createTopic', topic)
      .then(function successCallback(response) {
        topicsCtrl.topics.push(response.data)
        topicsCtrl.stopEditingTopic()
      }, function errorCallback(response) {
        /*
         * Boton de reintentar,
         * sin contador
         */
      })

  topicsCtrl.updateTopics()
})
