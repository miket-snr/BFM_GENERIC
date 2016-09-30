(function() {
    
    var SignUpController = function ($scope,  dataFactory) {
        $scope.signupData = {};
        
        $scope.signup = function() {
             alert('Signing Up!') ;
        }        

    };
    
    SignUpController.$inject = ['$scope',  'dataFactory'];

    angular.module('templateApp')
      .controller('SignUpController', SignUpController);
    
}());