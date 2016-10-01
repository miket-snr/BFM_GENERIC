
(function() {
    var dataFactory = function($http, localstorage, AuthsFactory) {
    
        var factory = {};
            factory.locationData = {} ;
            factory.divisionData = {} ;
            factory.mobi = true ;
            factory.fileUri = '';
            factory.treeData = [];
		factory.CallBuilder = {
			 CONTRACTCODE :'BASE' ,
			 LEVEL :'' ,
			 SERVICECODE :'' ,
			 KEY_LEVEL_1 :'' ,
			 DES_LEVEL_1 :'' ,
			 KEY_LEVEL_2 :'' ,
			 DES_LEVEL_2 :'' ,
			 KEY_LEVEL_3 :'' ,
			 DES_LEVEL_3 :'' ,
			 KEY_LEVEL_4 :'' ,
			 DES_LEVEL_4 :'' ,
			 KEY_LEVEL_5 :'' ,
			 DES_LEVEL_5 :'' ,
			 KEY_LEVEL_6 :'' ,
			 DES_LEVEL_6 :'' ,
			 SHORT_TEXT :'' ,
			 LONGTEXT :'' ,
			 PARTNER_1 :'' ,
			 PARTNER_2 :'' ,
			 DIVISION :'' ,
			 SERVICEPROVIDER :'' ,
			 DATE_1 :'' ,
			 DATE_2 :'' ,
			 TIME_1 :'' ,
			 TIME_2 :'' ,
			 EXTREF :'' ,
			 EXTRA_1: '',
			 EXTRA_2: '',
			 EXTRA_3: '',
			 
			EXTRA_4: ''
		} ;
            factory.screenModel = {
                username: factory.locationData.username ,
                calltype: 'T1',
                callStatus: true,
                username:'',
                division: 'Please Select ',
                adminStatus: false ,
                partner: '66011',
                altpartner: '66011',
                bpstatus: false,
                locationStatus: false,
                locationcode: '0',
                locationname:'',
                buildingcode: '',
                buildingname: '',
                buildingpriority: 'P5',
                floorcode: '',
                floorname:'',
                room: 'n/a',
                zonecode: '',
                zonename: '',
                zonepriority: '',
                servicecode: '',
                servicename: '',
                longkey: ' ',
                serviceStatus: false,
                priority: '',
                nodekey: '',
                nodetype: '',
                effect: '',
                department: '',
                routing: ' ',
                question: '',
                shorttext: null,
                longtext: null,
                feedback: ' ',
                notification:  0 ,
                siteList: [],
                buildingList: [],
                floorList: [],
                questList:[],
                questRankList:[],
                nodeQuestList:[],
                serviceNodeList:[],
                servicesList:[]
};
        factory.getsiteList = function(siteCode,siteName) {
            return $http.get('/customers/' + customerId);
        };
        factory.partnerList = function() {
            return {};
        };
        factory.getsiteList.error = function(siteCode) {
            return {};
        };
        factory.routinglist = [] ;
        factory.currentsection = [];
		factory.screensequence = 0 ;
     factory.BPList = {} ;
        
      factory.resetScreen = function() {
       factory.screenModel = {
           username: factory.locationData.username ,
              calltype: 'T1',
                callStatus: true,
                username:'',
                division: 'Please Select ',
                adminStatus: false ,
                partner: '66011',
                altpartner: '66011',
                bpstatus: false,
                locationStatus: false,
                locationcode: '0',
                locationname:'',
                buildingcode: '',
                buildingname: '',
                buildingpriority: 'P5',
                floorcode: '',
                floorname:'',
                room: 'n/a',
                zonecode: '',
                zonename: '',
                zonepriority: '',
                servicecode: '',
                servicename: '',
                longkey: ' ',
                serviceStatus: false,
                priority: '',
                nodekey: '',
                nodetype: '',
                effect: '',
                department: '',
                routing: ' ',
                question: '',
                shorttext: null,
                longtext: null,
                feedback: ' ',
                notification:  0 ,
                siteList: [],
                buildingList: [],
                floorList: [],
                questList:[],
                questRankList:[],
                nodeQuestList:[],
                serviceNodeList:[],
                servicesList:[]
};   
      };
     var oPartner = factory.partnerList() ;    
    factory.screenConfig = {} ;
	
 factory.buildTreeData =  function(){
                var l1 = 0; var l2 = 0; var l3 = 0; var l4 = 0;
                var s1 =  'ROOT' ; var s2 =  'X' ; var s3 = 'x' ;
                var oData3 = factory.screenModel.servicesList;
                oDat1 = []; 
                for (var i = 0, len = oData3.length; i < len; i++) {
                    if (oData3[i].PARENT == s1) {
                        l1 += 1; l2 = 0; l3 = 0; s2 =  oData3[i].NODEKEY;
                        oD1 = new Object();
                        oD1.key = oData3[i].NODEKEY;
                        oD1.title = oData3[i].NODECODE;
                        oD1.longkey = oData3[i].NODECODE;
                        oD1.nodes = [];
                        oDat1.push(oD1);
                    }
                    if (oData3[i].PARENT == s2) {
                        s3 = oData3[i].NODEKEY;
                        oD2 = new Object();
                        oD2.key = oData3[i].NODEKEY;
                        oD2.title = oData3[i].NODECODE;
                        oD2.longkey = oData3[i].NODECODE ;
                        oD2.nodes = [] ;
                        oD1.nodes.push(oD2);
                    }
                   
                    if (oData3[i].PARENT == s3 ){
                    oD3 = new Object();
                        oD3.key = oData3[i].NODEKEY;
                        oD3.title = oData3[i].NODECODE;
                        oD3.longkey = oData3[i].NODECODE ;
                    oD2.nodes.push(oD3);
                }
                   
}
factory.treeData = oDat1 ; 
 } ;
 factory.getHierarchy =  function(){
                var l1 = 0; var l2 = 0; var l3 = 0; var l4 = 0;
                var s1 =  X ; var s2 =  X ; var s3 = x  ;
                var oData3 = factory.nodeData;
                oDat1 = []; 
                for (var i = 0, len = oData3.length; i < len; i++) {
                    if (oData3[i].Level1 != s1) {
                        s1 = oData3[i].Level1;
                        l1 += 1; l2 = 0; l3 = 0; s2 =  X ;
                        oD1 = new Object();
                        oD1.key = oData3[i].NodeKey;
                        oD1.title = oData3[i].Level1;
                        oD1.longkey = oData3[i].Level1;
                        oD1.nodes = []
                        oDat1.push(oD1);
                    }
                    if (oData3[i].Level2 != s2) {
                        s2 = oData3[i].Level2;
                        l2 += 1; l3 = 0; s3 =  X ;
                        oD2 = new Object();
                        oD2.key = oData3[i].NodeKey +  -  + l2;
                        oD2.title = oData3[i].Level2;
                        oD2.longkey = oData3[i].Level1 +  ~  + oData3[i].Level2;
                        oD2.nodes = [] ;
                        oD1.nodes.push(oD2);
                    }
                    l3 += 1;
                    if (oData3[i].Level3 != null){
                    oD3 = new Object();
                    oD3.key = oData3[i].NodeKey +  -  + l2 +  -  + l3;
                    oD3.title = oData3[i].Level3;
                    oD3.longkey =  oData3[i].Level1 +  ~  + oData3[i].Level2 +  ~  + oData3[i].Level3;
                    oD2.nodes.push(oD3);
                }

}
      return oDat1 ;  } ;       
//factory.treedata = factory.getHierarchy() ;
	factory.callerscreen = {caller:'',extradata:''} ;	
	factory.configList = {menulist:[],configlist:[] };
   	factory.contractcode = localstorage.contractcode ;
    factory.getSAPConfig  = function(contractcode, dataxFactory) {
            var call = 'Partner=ABCD&ClientID=MOSC&CallContext={CONTRACTCODE:' + contractcode + '}';
            var token = ' ';
            var successConfig = function(res) {
              	for (var i = 0 ; i< res.ServicesList.length ; i++ ) {
				   var tempstr =	res.ServicesList[i].JsonsetJstext.replace(/:,/g, ': 0 ,' );
                           var tempObj = JSON.parse(tempstr);
                    if( tempObj.SCREENNAME =='BASE' && tempObj.SHOWTHIS =='X') {
						dataxFactory.menulist.push(tempObj) ; 
					}   
					dataxFactory.configlist.push(tempObj) ;                        
            }};
         AuthsFactory.getData(token, successConfig, function (res) {
           console.log( 'Failed to get Config data');
        }, call);
          return 'X' ;
        }    ;
    function getService(datamodel,innerfactory) {
            var call = 'Partner=SBFM&ClientId=SERV&CallContext={}';
            var token = ' ';
            var that =  datamodel ;
        var innerfactory = innerfactory ;
            var successSerAuth = function(res) {
                      for (var i = 0 ; i< res.ServicesList.length ; i++ ) {
                              var tempObj = JSON.parse(res.ServicesList[i].JsonsetJstext);
                               if(tempObj.NODETYPE == null) {
                                   tempObj.NODETYPE = 'NA' ; }
                					that.servicesList.push(tempObj ) ;
                               				          
                      };
                    innerfactory.buildTreeData() ;   
            };
            AuthsFactory.getServices(token, successSerAuth,
                function(res) {
                    var error =  'Failed to get services data';
                console.log(error );
                }, call);
        };
        getService(factory.screenModel,factory) ;
        
//    factory.getroutinglist = function(routlist,icall) {   
//        routlist = [];
//        AuthsFactory.getSBFMRouting('', function(res){
//                      for (var i = 0 ; i< res.ServicesList.length ; i++ ) {
//                              var tempObj = JSON.parse(res.ServicesList[i].JsonsetJstext);
//                					routlist.push(tempObj ) ;
//                               				          
//                      };
//                       
//            },
//                function(res) {
//                    $rootScope.error = res.error ||
//                        'Failed to get data';
//                }, icall);};
//         factory.getroutinglist(factory.routinglist) ;
   //      factory.getService(factory.screenModel.serviceNodeList) ;
       return factory;
    };
    
    dataFactory.$inject = ['$http','$localStorage','AuthsFactory'];
        
    angular.module('templateApp').factory('dataFactory', 
                                          dataFactory);
                                           
}());
