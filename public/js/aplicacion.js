var app = angular.module('manejador-de-tareas', ['ui.router'])

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state({
    name: "tareas",
    url: "/tareas",
    templateUrl: '/views/tareas.view.html',
    controller: 'TareasController as tareasCtrl'
  }).state({
    name: "materias",
    url: "/materias",
    templateUrl: '/views/materias.view.html',
    controller: 'MateriasController as materiasCtrl'
  }).state({
    name: "acercaDe",
    url: "/acercaDe",
    templateUrl: '/views/acercaDe.view.html'
  }).state({
    name: "login",
    url: "/login",
    templateUrl: '/views/login.view.html',
    controller: 'LoginController as loginCtrl'
  }).state({
    name: "registrar",
    url: "/registrar",
    templateUrl: '/views/registrar.view.html',
    controller: 'RegistrarController as registrarCtrl'
  }).state({
    name: "perfil",
    url: "/perfil",
    templateUrl: '/views/perfil.view.html',
    controller: 'PerfilController as perfilCtrl'
  })
  $urlRouterProvider.otherwise("/acercaDe")
})
