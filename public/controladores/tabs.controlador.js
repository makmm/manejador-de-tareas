app.controller('TabsController', ($scope, $route, $routeParams, $location) => {
  var tabsCtrl = this;

  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  /*
  $scope.tab = 0;

  tabsCtrl.setearTab = (tab) => {
    console.log(tab);
    $scope.tab = tab;
  };

  tabsCtrl.tabSeleccionadaEs = (tab) => {
    return tab == $scope.tab;
  };

  tabsCtrl.conseguirTab = function(){
    return $scope.tab;
  };

  //tabsCtrl.setearTab(1);
  */
});
