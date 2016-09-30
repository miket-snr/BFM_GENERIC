angular.module('templateApp').controller('cameraController', ['$rootScope', '$scope', '$routeParams', '$location','$timeout', '$localStorage', 'dataFactory', 'AuthsFactory',  function ($rootScope, $scope, $routeParams, $location,$timeout, $localStorage, dataFactory, AuthsFactory, Auth) {
// $scope.setOptions  = function setOptions(srcType) {
//     var options = {
//         // Some common settings are 20, 50, and 100
//         quality: 50,
//         destinationType: Camera.DestinationType.FILE_URI,
//         // In this app, dynamically set the picture source, Camera or photo gallery
//         sourceType: srcType,
//         encodingType: Camera.EncodingType.JPEG,
//         mediaType: Camera.MediaType.PICTURE,
//         allowEdit: true,
//         correctOrientation: true  //Corrects Android orientation quirks
//     }
//     return options;
// }


$scope.imageUri = "";


$scope.getPicture  = function getPicture(){

navigator.camera.getPicture($scope.onGetPictureSuccess, $scope.onGetPictureFail, { 
    targetWidth : 640,
    targetHeight : 480, 
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,   
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    correctOrientation: true 
     });
}

$scope.fileUri = '';
$scope.fileObj = null;


$scope.onGetPictureSuccess  = function onGetPictureSuccess(fileUri) {
    var image = document.getElementById('myImage');
        image.src =  fileUri;
     $scope.fileUri = fileUri;
    

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
$scope.showZone = function (room) {
		$scope.screenModel.room = room;
        $location.path('/zone/' + $scope.screenModel.locationcode + '/' +  $scope.screenModel.buildingcode);
	}	
}])