angular.module('templateApp').controller('createcallController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', '$localStorage', 'AuthsFactory', 'dataFactory', function ($rootScope, $scope, $routeParams, $location, $timeout, $localStorage, AuthsFactory, dataFactory, Auth) {
    $scope.screenModel = dataFactory.screenModel;
    $scope.sentcall = false ;
    $scope.createcall = function() {
            if ($scope.sentcall == true) {
                return ;
            } else
                {
                  $scope.sentcall = true  ;
                };
            var tempcode = $scope.screenModel.servicecode.split('-');
            var size = 'Lg';
            $scope.screenModel.servicecode = tempcode[0];
            var result = [];

           // var temp2 = $scope.screenModel.altpartner.split('-');
            $scope.calllog = {               

                ZPARTNER: $scope.username,
                ZBP2NAM: $scope.screenModel.username,
                ZTPLNR: '1000-' + $scope.screenModel.locationcode +
                    '-' + $scope.screenModel.buildingcode,
                ZROOM: $scope.screenModel.room,
                ZFLOOR: $scope.screenModel.floorcode,
                ZZONES:$scope.screenModel.zonename,
                ZPRIORITY:$scope.screenModel.zonepriority,
                ZNODEKEY:$scope.screenModel.servicecode,            
                SHORT_TEXT: $scope.screenModel.shorttext,
                LONGTEXT: $scope.screenModel.longtext,
                ZROUTING: $scope.screenModel.routing

            };
          $scope.clearphoto = function() {
                $scope.fileUri = '' ;
                dataFactory.fileUri = '' ;
                navigator.camera.cleanup() ;
          }
            $scope.newNotif = '';
            $scope.fileUri = dataFactory.fileUri;
            $scope.c1 = {CLASS:'SBFM',METHOD:'NEWNOTL'};
            $scope.c2 = $scope.calllog ;
            $scope.callobj = {callType:'post',
                              chContext: $scope.c1 ,
                              chData: $scope.c2} ;
            $scope.callstr = JSON.stringify($scope.callobj);
            $scope.callobj = JSON.parse($scope.callstr);
            var callsuccess = function(res) {
                var temp1 = res.d.chObjid ;
                var temp2 = temp1.replace(/\\/g, '');
                temp1 = temp2.replace(/"{/g, "{");
                temp2 = temp1.replace(/}"/g, "}");
                temp1 = JSON.parse(temp2);
                var temp = temp1.QMNUM;
                var tempint = parseInt(temp1.QMNUM, 10);
                var outstr = 'Notification Created:->  ' + tempint;
                alert(outstr);
                $scope.newNotif = temp ;

if($scope.fileUri.length > 5){
      window.resolveLocalFileSystemURL($scope.fileUri, function(fileEntry) {  
        fileEntry.file(function(fileObj) {
        $scope.fileObj = fileObj;
        var reader = new FileReader();
        reader.onloadend = function() {
          var data = this.result.split(",").pop();
          $scope.upload = {"callType":"post",
                "chContext":{"CLASS":"ATTACH","METHOD":""},
                "chData":{"fileName":$scope.newNotif+'.jpg',"fileSize":$scope.fileObj.size,"fileType":"jpg"
                           ,"fileContent":data
                           ,"targetObjId":$scope.newNotif,"targetObjType":"BUS2080"}
                       };
         AuthsFactory.attachPhoto(function(res) {
               //alert("uploaded!");
                 }, function(res) {
                alert(res.error);
                 }, $scope.upload);

};
   
   reader.readAsDataURL(fileObj);
        });
    });
   

};    
        $scope.screenModel.servicecode = ' ';
        $scope.screenModel.servicename = '';
	    $scope.screenModel.shorttext = ' ';
        $scope.screenModel.longtext = '';
        $scope.clearphoto() ;        
      $scope.menu() ;          
  };
           AuthsFactory.postNotif(callsuccess, function(res) {
                $rootScope.error = res.error ||
                    'Failed to get data';
            }, $scope.callobj);
            return;
   };

	$scope.menu = function () {
         $location.path('/');
	}
				
}])