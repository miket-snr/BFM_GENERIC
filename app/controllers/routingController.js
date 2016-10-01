angular.module('templateApp').controller('routingController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$localStorage', 'AuthsFactory', 'dataFactory','callLogic', function ($rootScope, $scope, $routeParams, $location, $timeout, $localStorage, AuthsFactory, dataFactory, callLogic) { 
  $scope.routlist = [] ;
   $scope.calldata = {} ;  
  $scope.calldata = dataFactory.screenModel;
    $scope.screenModel = dataFactory.screenModel;
  $scope.callobj = 'Partner=SBFM&ClientId=ROUT&CallContext={CONTRACTCODE:SBFM,SERVICECODE:' +  $scope.calldata.servicecode + '}'  ;
  var prom = AuthsFactory.getSBFMRouting($scope.callobj) ;
  prom.then(function(res){
                      var reply = res.data.ServicesList
                       if (reply[0] == 'ERROR')  {
                  $location.path('/'); 
                           return ;
              } 
                     $scope.routlist = [];
                      for (var i = 0 ; i< reply.length ; i++ ) {
                              var tempObj = JSON.parse(reply[i].JsonsetJstext);
                					$scope.routlist.push(tempObj ) ;
                               				          
                      }
                   if ($scope.routlist.length == 1){
                        $location.path('/'); 
                           return ;
                   }
                   
            },
                function(res) {
                    $rootScope.error = res.error ||
                        'Failed to get data';
                });
  $scope.lineSelect = function (servroute) {
        $scope.screenModel.routing = servroute.ROUTING;
	    $location.path('/');
	}
				
}])