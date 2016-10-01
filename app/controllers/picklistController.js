angular.module('templateApp').controller('picklistController', ['$rootScope', '$scope', '$routeParams', '$location','$timeout', '$localStorage', 'dataFactory', 'AuthsFactory',  function ($rootScope, $scope, $routeParams, $location,$timeout, $localStorage, dataFactory, AuthsFactory, Auth) {
    
  //On Entry we need to Identify the Call Context i.e. are we on Location or Partner or ?
 // what is the current config line
	$scope.thisconfigline = callLogic.getCurrentConfigLine();
 // now build the data fetch URL
	$scope.callUrl = callLogic.buildDataUrl();
 // what heading must I use?
	$scope.panelmessage = callLogic.buildHeading();
	$scope.screenModel = dataFactory.screenModel;
	
    $scope.message="" ;
    "PickList for " + $scope.atsection ;
    var that = $scope ;
    var token = '';
        that.pickList = [];
        var succpicklist = function (resf) {
            for (var ji = 0; ji < resf.SiteList.length; ji++) {
                var tempObj = resf.SiteList[ji];
                var pickObj = {} ;
                pickObj.code = tempObj.Code ;
                pickObj.name = tempObj.Name ;                
                that.pickList.push(pickObj);
            }
        };
        AuthsFactory.getData(token, succpicklist, function (res) {
            $rootScope.error = res.error ||
                'Failed to get data';
        },$scope.callUrl );
    
//Now what do we update and what is next step? 
     $scope.lineSelect = function(node) {
		//Update the CallContext 
		callLogic.updateCallContextFromList(node); 
		//Where to now?
		$location.path(callLogic.moveToNext()); 
    }; 

	     $scope.goBack = function() {
		//Where to now?
		$location.path(callLogic.moveToPrevious()); 
    }; 

}])