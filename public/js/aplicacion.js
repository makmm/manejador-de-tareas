var app = angular.module('manejador-de-tareas', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state({
    name: "tareas",
    url: "/tareas",
    templateUrl: '/views/tareas.view.html',
    controller: 'TareasController as tareasCtrl'
  });
  $stateProvider.state({
    name: "materias",
    url: "/materias",
    templateUrl: '/views/materias.view.html',
    controller: 'MateriasController'
  });
  $stateProvider.state({
    name: "acercaDe",
    url: "/acercaDe",
    templateUrl: '/views/acercaDe.view.html'
  });
  $urlRouterProvider.otherwise("/acercaDe")
});
