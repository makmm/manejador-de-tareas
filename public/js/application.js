var app = angular.module('manejador-de-tareas', ['ui.router'])

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state({
    name: "homeworks",
    url: "/homeworks",
    templateUrl: '/views/homeworks.view.html',
    controller: 'HomeworksController as homeworksCtrl'
  }).state({
    name: "topics",
    url: "/topics",
    templateUrl: '/views/topics.view.html',
    controller: 'TopicsController as topicsCtrl'
  }).state({
    name: "aboutUs",
    url: "/aboutUs",
    templateUrl: '/views/aboutUs.view.html'
  }).state({
    name: "login",
    url: "/login",
    templateUrl: '/views/login.view.html',
    controller: 'LoginController as loginCtrl'
  }).state({
    name: "register",
    url: "/register",
    templateUrl: '/views/register.view.html',
    controller: 'RegisterController as registerCtrl'
  }).state({
    name: "profile",
    url: "/profile",
    templateUrl: '/views/profile.view.html',
    controller: 'ProfileController as profileCtrl'
  })
  $urlRouterProvider.otherwise("/aboutUs")
})
