angular.module('templateApp').controller('datepickingController', ['$rootScope', '$scope', '$routeParams', '$location','$timeout', '$localStorage', 'AuthsFactory', 'dataFactory', 'callLogic', function ($rootScope, $scope, $routeParams, $location,$timeout, $localStorage, AuthsFactory, dataFactory, callLogic) {
    
	$scope.message="";			
	
   // };
     $scope.lineSelect = function(node) {
        $scope.locationStatus = true;
        $scope.screenModel.buildingcode = node.buildingcode;
        $scope.screenModel.buildingname = node.buildingname ;
        $scope.screenModel.buildingpriority = node.buildingpriority ;
  //      $scope.screenModel.sitecode = sitecode;
        $scope.showfloors();
    }; 

	$scope.showfloors = function () {
	    $location.path('/floor/' + $scope.screenModel.locationcode + '/' +  $scope.screenModel.buildingcode);
         // $location.path('/floor/' + $scope.sitecode + $scope.building );

	}	
}])