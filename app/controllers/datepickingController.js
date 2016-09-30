angular.module('templateApp').controller('buildingController', ['$rootScope', '$scope', '$routeParams', '$location','$timeout', '$localStorage', 'AuthsFactory', 'dataFactory',  function ($rootScope, $scope, $routeParams, $location,$timeout, $localStorage, AuthsFactory, dataFactory, Auth) {
    
	$scope.message="";			
	sitecode=$routeParams.code;	
	$scope.screenModel = dataFactory.screenModel;
	

	//$scope.doBUSearch = function(sitecode) {
        var call = 'Partner=SBFM&ClientId=BULS&CallContext={BE_MASK:' +
            sitecode + ',NAME_MASK:BUILDINGLIST}';
        var token = '';
        var that = $scope;
        that.buildingList = [];
        var successAuth = function(res) {
            for (var i = 0; i < res.ServicesList.length; i++) {
                var tempObj = JSON.parse(res.ServicesList[i].JsonsetJstext);
                var buObj = {} ;
                buObj.buildingcode = tempObj.SWENR ;
                buObj.buildingname = tempObj.XWETEXT ;    
                buObj.buildingpriority = tempObj.PRIORK;
                that.buildingList.push(buObj);
            }
        };
        AuthsFactory.getData(token, successAuth, function(res) {
            $rootScope.error = res.error ||
                'Failed to get data';
        }, call);
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