(function () {
    'use strict';

    var apidataFactory = function($http, $localStorage,$timeout, urls) {
    
        var apifactory = {};
         apifactory.getFloorList = function(token,success,error) {
            return $http({
                method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/SiteList?Sitecode=0&Sitename=0',
                        headers: {'Authorization': "Bearer " + $localStorage.token  }                   
                          }).success(success).error(error)    
         
         };
 
         apifactory.getData = function(token,success,error,call) {
             var icall = call || 'Partner=1&ClientId=TKBE&CallContext={BE_MASK:00019 ,NAME_MASK:BUILDINGLIST}'; 
         return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }
                          }).success(success).error(error)  
         
         };
           apifactory.getServices = function(token,success,error,call) {
             var icall = call || 'Partner=SBFM&ClientId=SERV&CallContext={}'; 
         return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }
                        
                          }).success(success).error(error)  
         
           };
          
           apifactory.getSla = function(token,success,error,call) {
             var icall = call || 'Partner=1&ClientId=6&CallContext={}'; 
         return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }
                        
                          }).success(success).error(error)  
         
         };
          apifactory.getSlaPriority = function(token,success,error,call) {
             var icall = call || 'Partner=1&ClientId=6A&CallContext={}'; 
         return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }
                        
                          }).success(success).error(error)  
         
         };
//          apifactory.getSBFMRouting = function(token,success,error,call) {
//             var icall = call || 'Partner=SBFM&ClientId=ROUT&CallContext={CONTRACTCODE:SBFM}'; 
//         return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
//                        headers: {'Authorization': "Bearer "+$localStorage.token  }
//                        
//                          }).success(success).error(error)  
//         
//         };
           apifactory.getSBFMRouting = function(call) {
             var icall = call || 'Partner=SBFM&ClientId=ROUT&CallContext={CONTRACTCODE:SBFM}'; 
         return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }                       
                          }) ;
         };      
        
          apifactory.postNotif = function(success,error,call) {
 
         return   $http({method: 'POST', url: 'https://io.bidvestfm.co.za/BIDVESTFM_API_GEN/genpost',
                        headers: {'Content-Type': 'application/json'  },
                     
                        data:call                         
                               }).success(success).error(error)  
         
         };       
          apifactory.attachPhoto = function(success,error,call) {
 
         return   $http({method: 'POST', url: 'https://io.bidvestfm.co.za/BIDVESTFM_API_GEN/genpost',
                        headers: {'Content-Type': 'application/json'  },
                     
                        data:call                         
                               }).success(success).error(error)  
          
         };  
          apifactory.getusernames = function(success,error,call){
              var icall = 'Partner=SBFM&ClientId=UNAM&CallContext={CONTRACTCODE:SBFM,ZEMAIL:' + call + '}'; 
              return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/FlexData?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }                       
                          }).success(success).error(error) ;
              
          };
    
          apifactory.signin = function (data2go, success, error) {
                  $http({
                        method: 'POST',
                        url: urls.BASE + '/token',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: {grant_type:'password',username: data2go.username, password: data2go.password}
                  }).success(success).error(error)
                };
               apifactory.modpwd = function(success,error,call){
              var icall = 'Partner=ALLC&ClientId=AUTH&CallContext='  + JSON.stringify(call) ; 
              return   $http({method: 'GET', url: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev2/api/SETAUTH/PWNEW?'+icall,
                        headers: {'Authorization': "Bearer "+$localStorage.token  }                       
                          }).success(success).error(error) ;
              
          }; 
        apifactory.logout = function (success) {
                    delete $localStorage.token;
                    $timeout(function () {
                     success() ;
                    }, 110);
                    
                };

        apifactory.getUsername = function () {
            return $localStorage.username;
        };
/*
             $scope.getConfig = function(contractcode) {
            var call = 'Partner=ABCD&ClientID=MOSC&CallContext={CONTRACTCODE:' + contractcode + '}';
            var token = ' ';
            var that = $scope;
            var successSerAuth = function(res) {
                      for (var i = 0 ; i< res.ServicesList.length ; i++ ) {
                           var tempObj = JSON.parse(res.ServicesList[i].JsonsetJstext);
                               if(typeof tempObj.GROUPNAME == 'undefined' || tempObj.GROUPNAME == '') {tempObj.GROUPNAME = 'HEADER';}
                               if( tempObj.SHOWTHIS == 'X') {tempObj.SHOWTHIS = true;} else {tempObj.SHOWTHIS = false;}
                               switch(tempObj.SECTIONNAME) {
                                   case 'DIVISION' :
                                       switch(tempObj.GROUPNAME) {
                                               case  'HEADER':
                                               dataFactory.screenConfig.division.active = tempObj.SHOWTHIS ;
                                               dataFactory.screenConfig.division.displayname = tempObj.DISPLAYNAME ;  
                                               break;  
                                           default:
                                               dataFactory.screenConfig.division[tempObj.GROUPNAME].active = tempObj.SHOWTHIS  ;
                                               dataFactory.screenConfig.division[tempObj.GROUPNAME].displayname = tempObj.DISPLAYNAME ;
                                       }
                                       break ;
                                   case 'PARTNER' :
                                          switch(tempObj.GROUPNAME) {
                                               case  'HEADER':
                                               dataFactory.screenConfig.partners.active = tempObj.SHOWTHIS  ;
                                               dataFactory.screenConfig.partners.displayname = tempObj.DISPLAYNAME ;  
                                               break;  
                                           default:
                                               dataFactory.screenConfig.partners[tempObj.GROUPNAME].active = tempObj.SHOWTHIS  ;
                                               dataFactory.screenConfig.partners[tempObj.GROUPNAME].displayname = tempObj.DISPLAYNAME ;
                                       }
                                       break ;
                                   case 'LOCATION' :
                                          switch(tempObj.GROUPNAME) {
                                               case  'HEADER':
                                               dataFactory.screenConfig.location.active = tempObj.SHOWTHIS  ;
                                               dataFactory.screenConfig.location.displayname = tempObj.DISPLAYNAME ;  
                                               break;  
                                           default:
                                               dataFactory.screenConfig.location[tempObj.GROUPNAME].active = tempObj.SHOWTHIS  ;
                                               dataFactory.screenConfig.location[tempObj.GROUPNAME].displayname = tempObj.DISPLAYNAME ;
                                       }
                                       break ;
                                   case 'SERVICE' :
                                          switch(tempObj.GROUPNAME) {
                                               case  'HEADER':
                                               dataFactory.screenConfig.service.active = tempObj.SHOWTHIS || 'X' ;
                                               dataFactory.screenConfig.service.displayname = tempObj.DISPLAYNAME ;  
                                               break;  
                                           default:
                                          if (tempObj.SHOWTHIS = 'X') {
                                           dataFactory.screenConfig.service.typeofview = tempObj.GROUPNAME ;   
                                          }    
                                               ;
                                       }
                                       break ;
                                   case 'ROUTING' :
                                          switch(tempObj.GROUPNAME) {
                                               case  'HEADER':
                                               dataFactory.screenConfig.routing.active = tempObj.SHOWTHIS || 'X' ;
                                               dataFactory.screenConfig.routing.displayname = tempObj.DISPLAYNAME ;  
                                               break;  
                                           default:
                                          if (tempObj.SHOWTHIS = 'X') {
                                           dataFactory.screenConfig.routing.typeofview = tempObj.GROUPNAME ;   
                                          }    
                                               ;
                                       }
                                       break ;
                                       
                      }
                      };
                        that.screenconfig = dataFactory.screenConfig ;
                  
            };
            this.getData(token, successSerAuth,
                function(res) {
                    $rootScope.error = res.error ||
                        'Failed to get data';
                }, call);
        };        
*/


        
        return apifactory;
    };
    
    apidataFactory.$inject = ['$http', '$localStorage', '$timeout', 'urls'];
        
    angular.module('templateApp').factory('AuthsFactory', apidataFactory);
                                           
}());