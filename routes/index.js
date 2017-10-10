module.exports = async (app) => {
  const routes = [
    './homeworks/getHomeworks.js',
    './homeworks/deleteHomework.js',
    './homeworks/editHomework.js',
    './homeworks/createHomework.js',
    './topics/getTopics.js',
    './topics/deleteTopic.js',
    './topics/editTopic.js',
    './topics/createTopic.js',
    './login/account/createAccount.js',
    './login/account/getProfile.js',
    './login/account/editProfile.js',
    './login/account/changePassword.js',
    './login/session/createSession.js',
    './login/session/deleteSession.js',
    './login/session/getSession.js'
  ]

  for(var i = 0; i < routes.length; i++){
    require(routes[i])(app)
  }
}
