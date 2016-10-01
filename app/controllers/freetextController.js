angular.module('templateApp').controller('freetextController', ['$rootScope', '$scope', '$routeParams', '$location','$timeout', '$localStorage', 'dataFactory', 'AuthsFactory','callLogic',  function ($rootScope, $scope, $routeParams, $location,$timeout, $localStorage, dataFactory, AuthsFactory, callLogic) {
   
	$scope.message="";			
	$scope.screenModel = dataFactory.screenModel ;	

	$scope.checkvalid = function(){
      $scope.checklong=dataFactory.screenModel.longtext;
      $scope.checkshort=dataFactory.screenModel.shorttext;
         if($scope.checklong && $scope.checkshort){
            $scope.showBase();
         } else $scope.message="Please enter Text ";
      
    };
    
	$scope.showBase = function () {
        $location.path('/')
	}	
}])