(function() {
    "use strict";
    var ServTreeController = function($rootScope, $scope, $window, $filter, $modal,
        dataFactory, $log, AuthsFactory) {
        $scope.handle = '';
        $scope.username = AuthsFactory.getUsername();
        $scope.searchBox = '';
        $scope.partners = {};
        $scope.SLAQList = [];
        $scope.showtree = false ;
        $scope.treeData = dataFactory.treeData;
        $scope.items =  dataFactory.treeData;  
        $scope.screenconfig = dataFactory.screenConfig;
        $scope.screenModel = dataFactory.screenModel;
        $scope.screenModel.btn = true;
        $scope.screenModel.locationStatus = false;
        $scope.screenModel.warn = false;
        $scope.questList = dataFactory.screenModel.questList;
        $scope.questRankList = dataFactory.screenModel.questRankList;
        $scope.servicesList = dataFactory.screenModel.servicesList;
       // Get the Services from SAP
        $scope.fetchServiceList = function() {
            var call = 'Partner=SBFM&ClientId=SERV&CallContext={}';
            var token = ""
            var that = $scope;
            that.servicesList = [];
            var successAuth = function(res) {
                for (var i = 0; i < res.ServicesList.length; i++) {
                    var tempObj = JSON.parse(res.ServicesList[i]
                        .JsonsetJstext);
                    that.servicesList.push(tempObj);
                }
                dataFactory.screenModel.servicesList = $scope.servicesList;
                dataFactory.buildTreeData();
                $scope.treeData = dataFactory.treeData;
            };
            AuthsFactory.getData(token, successAuth, function(res) {
                $rootScope.error = res.error ||
                    'Failed to get data';
            }, call);
        };
        if ($scope.servicesList[1] == null) {
            $scope.fetchServiceList();
            $scope.showtree = true ;
        }
               
   $scope.selected = {
        item: $scope.items[0]
    };
    $scope.treeselect = function(node) {
        $scope.screenModel.servicecode = node.key;
        $scope.screenModel.longkey = node.longkey;
        $scope.screenModel.servicename = node.longkey;
        $scope.screenModel.serviceStatus = true;
    };
    $scope.lineselect = function(node) {
        $scope.screenModel.servicecode = node.NodeKey;
        $scope.screenModel.longkey = node.searchfield;
        $scope.screenModel.servicename = node.longkey;
        $scope.screenModel.effect = node.Effect;
        $scope.screenModel.department = node.Department;
        $scope.screenModel.serviceStatus = true;
    };
    $scope.collapseAll = function() {
        $scope.$broadcast('collapseAll');
    };
    $scope.expandAll = function() {
        $scope.$broadcast('expandAll');
    };
    $scope.data = $scope.items;
    $scope.toggle = function(scope) {
        scope.toggle();
    };
      $scope.resetService = function() {
                $scope.screenModel.serviceStatus = false;
                $scope.screenModel.servicecode = ''; 
                $scope.screenModel.servicename = '' ;
                $scope.screenModel.department = '';
                $scope.screenModel.longkey = '';
                $scope.localQuestList = [];
                $scope.searchBox = '';
                $scope.priority = {};
                $scope.showQuest = false;
            };
             
        $scope.treeOptions = {
            nodeChildren: "nodes",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        }
       

 $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
    };
    angular.module('templateApp').controller('ServTreeController',
        ServTreeController);
})();

angular.module('templateApp').controller('ModalSrvInstanceCtrl', function(
    $scope, $modalInstance, items, screenModel) {
    $scope.items = items;
    $scope.screenModel = screenModel;
    $scope.sitefilter = "";
    $scope.screenfields = 'None Selected';
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.treeselect = function(node) {
        $scope.screenModel.servicecode = node.key;
        $scope.screenModel.longkey = node.longkey;
        $scope.screenModel.serviceStatus = true;
    };
    $scope.lineselect = function(node) {
        $scope.screenModel.servicecode = node.NodeKey;
        $scope.screenModel.longkey = node.searchfield;
        $scope.screenModel.effect = node.Effect;
        $scope.screenModel.department = node.Department;
        $scope.screenModel.serviceStatus = true;
    };
    $scope.collapseAll = function() {
        $scope.$broadcast('collapseAll');
    };
    $scope.expandAll = function() {
        $scope.$broadcast('expandAll');
    };
    $scope.data = items;
    $scope.toggle = function(scope) {
        scope.toggle();
    };
    $scope.doSearch = function(sitecode, sitename) {
        dataFactory.dobuildingsearch(sitecode, sitename);
    }
    $scope.serviceok = function() {
        $modalInstance.close($scope.screenModel);
      //  $location.path('/');
    };
    $scope.servicecancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
