(function() {
    
    var SignUpController = function ($scope,  dataFactory,callLogic) {
        $scope.signupData = {};
        
        $scope.signup = function() {
             alert('Signing Up!') ;
        }        

    };
    
    SignUpController.$inject = ['$scope',  'dataFactory','callLogic'];

    angular.module('templateApp')
      .controller('SignUpController', SignUpController);
    
}());