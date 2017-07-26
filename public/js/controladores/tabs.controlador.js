app.controller('TabsController', ($scope) => {
  var tabsCtrl = this;

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
});
