angular.module('templateApp').controller('locationController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$localStorage', 'AuthsFactory', 'dataFactory', function ($rootScope, $scope, $routeParams, $location, $timeout, $localStorage, AuthsFactory, dataFactory, Auth) {
    	
    $scope.screenModel = dataFactory.screenModel;
    $scope.message=""
    $scope.panelmessage="Search Site"
    $scope.sitecode = '';
    $scope.sitename = '';
    $scope.doSiteSearch = function (sitecode, sitename) {
        $scope.panelmessage="Select Site"
        sitename=sitename;
       var call = 'Partner=SBFM&ClientId=BELS&CallContext={BE_MASK:' +
            sitecode + ',NAME_MASK:' + "*"+sitename+"*" + '}';
        var token = $localStorage.token;
        var that = $scope;
        that.siteList = [];
        var successAuth = function (res) {
            for (var i = 0 ; i < res.ServicesList.length ; i++) {
                var tempObj = JSON.parse(res.ServicesList[i].JsonsetJstext);
                var siteObj = {} ;
                siteObj.sitecode = tempObj.SWENR ;
                siteObj.sitename = tempObj.XWETEXT ; 
                that.siteList.push(siteObj);
            };
        };
        AuthsFactory.getData(token, successAuth, function (res) {
            $rootScope.error = res.error || 'Failed to get data';
        }, call);
    };

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