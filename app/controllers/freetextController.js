angular.module('templateApp').controller('descriptionController', ['$rootScope', '$scope', '$routeParams', '$location','$timeout', '$localStorage', 'dataFactory', 'AuthsFactory',  function ($rootScope, $scope, $routeParams, $location,$timeout, $localStorage, dataFactory, AuthsFactory, Auth) {
   
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