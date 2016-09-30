angular.module('templateApp').controller('BaseController', ['$rootScope', '$scope', '$location','$timeout', '$localStorage', 'AuthsFactory','dataFactory' , 'callLogic', function ($rootScope, $scope, $location,$timeout, $localStorage, Auth,dataFactory,callLogic) {
       function successAuth(res) {
                    $localStorage.token = res.access_token;
                    $localStorage.username = $scope.email;
                    $localStorage.fullname = '*';
                    $localStorage.partner = '*';
                    $localStorage.clientcode = 'BASE';
                    $scope.token = $localStorage.token;
                     $timeout(function () {
                      window.location = "index.html";
                    }, 110);
                  dataFactory.getConfig('BASE') ; 
                  Auth.getusernames( successDet, function () {
                        $rootScope.error = 'Invalid credentials.';
                    },$scope.email);
                }
        var  successDet = function(res) {
                  
            for (var i = 0; i < res.ServicesList.length; i++) {
                var tempObj = JSON.parse(res.ServicesList[i].JsonsetJstext);
                 var username = {} ;
                 $localStorage.firstname = tempObj.NAME_FIRST ;
                 $localStorage.lastname = tempObj.NAME_LAST ;    
                 $localStorage.sundry = tempObj.QUEUEDETAIL;
                 $scope.firstname = $localStorage.firstname ;
                 $scope.lastname = $localStorage.lastname ;
                 i = 24 ; //always exit loop
            }
                  }
         $scope.findusernames = function() { 
             var tuser = $scope.username;
             Auth.getusernames( successDet, function () {
                        $rootScope.error = 'Invalid credentials.';
         },tuser) };
         $scope.signin = function () {
                    var formData = {
                       grant_type: 'password',
                        username: $scope.email,
                        password: $scope.password
                    };

                    Auth.signin(formData, successAuth, function () {
                        $rootScope.error = 'Invalid credentials.';
                    })
                };

          $scope.signup = function () {
                    var formData = {
                        grant_type: 'password',
                        username: $scope.email,
                        password: $scope.password,
                        firstname: $scope.firstname,
                        lastname: $scope.lastname
                    };

                    Auth.signup(formData, successAuth, function (res) {
                        alert('Failed to sign up.');
                    });
                };
          $scope.resetpwd = function () {
                    var formData = {
                        smtp_addr: $scope.email,
                        passwordnew: $scope.passwordnew,
                        partnerstatus: 'R'
                    };

                    Auth.modpwd(JSON.stringify(formData), successAuth, function (res) {
                        alert('Failed to sign up.');
                    });
                };
          $scope.logout = function () {
                  Auth.logout(function () {
                  delete $localStorage.token;
                  $localStorage.$reset();

                      $timeout(function () {
                      window.location = "index.html";
                    }, 110);
                    });
                };
                $scope.token = $localStorage.token;
                $scope.username = $localStorage.username;
                if ($localStorage.firstname == undefined || $localStorage.firstname.length < 2 ){
                    $scope.findusernames() ;
                }
                $scope.firstname = $localStorage.firstname ;
                $scope.lastname = $localStorage.lastname ;
    
                $scope.sortBy = 'name';
                $scope.reverse = false;
                $scope.customers = [];
            var d = new Date();
                $scope.yeardate = d.getFullYear();  
                $scope.myjson = {} ;
                $scope.screenModel = dataFactory.screenModel ;
                dataFactory.screenModel.username =  $localStorage.username;
                $scope.screenModel.username = $localStorage.username;
     
$scope.imageUri = "";
$scope.setFileUri = function (fileUri) {
   dataFactory.fileUri = fileUri ; 
} ;
$scope.clickedOn = function(screenObjLine){
  var nextscreen = callLogic.moveTo(screenObjLine) ;
  $location.path(nextscreen);	
};
	
$scope.screenpagelist = dataFactory.configList.menulist ;	

$scope.getPicture  = function getPicture(){

navigator.camera.getPicture($scope.onGetPictureSuccess, $scope.onGetPictureFail, { 
    targetWidth : 640,
    quality: 90,
    destinationType: Camera.DestinationType.FILE_URI,   
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    correctOrientation: true 
     });
}

$scope.fileUri = dataFactory.fileUri;
$scope.fileObj = null;


$scope.onGetPictureSuccess  = function onGetPictureSuccess(fileUri) {
    var image = document.getElementById('myImage');
     $scope.setFileUri(fileUri) ;
     $scope.fileUri = dataFactory.fileUri;
     image.src =  $scope.fileUri;
     $scope.$apply() ;
     console.log('Loaded FileUri' + fileUri );
};

    function errorHandler(e) {
  var msg = '';

  switch (e.code) {
//1
     case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
     break;
//2
      case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
//3
 case FileError.ABORT_ERR:
      msg = 'ABORT_ERR';
      break;
//4
 case FileError.NOT_READABLE_ERR:
      msg = 'NOT_READABLE_ERR';
      break;
//5
 case FileError.ENCODING_ERR:
      msg = 'ENCODING_ERR';
      break;
//6
 case FileError.NO_MODIFICATION_ALLOWED_ERR:
      msg = 'NO_MODIFICATION_ALLOWED_ERR';
      break;
//7
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
//8
    case FileError.SYNTAX_ERR:
      msg = 'SYNTAX_ERR';
      break;
//9
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
//10
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
//11
    case FileError.TYPE_MISMATCH_ERR:
      msg = 'TYPE_MISMATCH_ERR';
      break;
//12
    case FileError.PATH_EXISTS_ERR:
      msg = 'PATH_EXISTS_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  }

  console.log('Error: ' + msg);
}


$scope.onGetPictureFail  =   function onGetPictureFail(message) {  
    alert('Failed because: ' + message);
};
  }])