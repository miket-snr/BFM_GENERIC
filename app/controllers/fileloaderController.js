angular.module('templateApp').controller('fileloaderController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$localStorage', 'AuthsFactory', 'dataFactory', function ($rootScope, $scope, $routeParams, $location, $timeout, $localStorage, AuthsFactory, dataFactory, Auth) {
    	
    $scope.message=""


      $scope.lineSelect = function(node) {
        $scope.screenModel.locationcode = node.sitecode;
        $scope.screenModel.locationname = node.sitename;
        $scope.screenfields = node.sitecode + "-" + node.sitename;
        $scope.locationStatus = true;
        
        $scope.showbuildings();
    }; 

	$scope.showbuildings = function () {
	    $location.path('/building/' + $scope.screenModel.locationcode);
	}
				
}])