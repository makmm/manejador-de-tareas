app.controller('TabsController', ($scope, $route, $routeParams, $location) => {
  var tabsCtrl = this

  $scope.$route = $route
  $scope.$location = $location
  $scope.$routeParams = $routeParams
})
