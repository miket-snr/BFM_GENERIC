 
 (function () {
    'use strict';

    var configFactory = function($http, $localStorage,$timeout, urls,dataFactory) {
        dataFactory.getSAPConfig(dataFactory.contractcode,dataFactory.configList) ;

        var conffactory = {};
       	conffactory.currentsection = '' ;
		conffactory.currentsectionlist = [] ;
		conffactory.currentconfigline =  {} ;
		conffactory.callcontext = dataFactory.CallBuilder;
		conffactory.currentsequencenmbr = 0 ;
		conffactory.contractcode = $localStorage.contractcode ;
		conffactory.username = '' ;
		

       conffactory.getContext = function (atSection) {
            return ;
        };
		conffactory.moveTo = function (screenObjLine) {
		this.currentsectionlist = [];
		for( var i = 0; i < dataFactory.configList.configlist.length ; i++) {
			if (screenObjLine.SECTIONNAME == dataFactory.configList.configlist[i].SCREENNAME){
				this.currentsectionlist.push(dataFactory.configList.configlist[i]);
			}
		}
		this.currentsequencenmbr = 0 ;
		this.currentconfigline = this.currentsectionlist[this.currentsequencenmbr];
		this.currentsection = this.currentconfigline.SECTIONNAME ;	
			
//	this.currentsection = this.currentsection | orderBy: 'SSEQUENCE' ;
		switch(this.currentconfigline.SCREEN_TYPE) {
		case 'TREE':
		   return '/tree/' + this.currentconfigline.DISPLAYNAME ;
			break;
			case 'LIST':
				 return '/PickList/' + this.currentconfigline.DISPLAYNAME ;
			break;
		default:
			return '/Search/' + this.currentconfigline.DISPLAYNAME ;
} 
	 
};
		 conffactory.getCurrentConfigLine = function (atSection) {
            return this.currentconfigline ;
        };
		 conffactory.buildDataUrl = function () {
			var callcontext_min =  this.stripblanks(this.callcontext)  
            return  'Partner=ABCD&ClientID=' + this.currentconfigline.SCR_CODE + '&CallContext=' + callcontext_min.stringify ;
        };
		 conffactory.buildHeading = function (atSection) {
            return 'panelmessage here' ;
        };
		 conffactory.updateCallContextFromList = function (node) {
            return ;
        };
		 conffactory.moveToNext = function () {
			 var path = '';
            return path;
        };
		 conffactory.moveToPrevious = function () {
            var path = '';
            return path;
        };
		
		conffactory.stripblanks = function(fullobj){
          var strippedobj = JSON.parse(JSON.stringify(fullobj));
		  for (var propName in strippedobj) { 
			if (strippedobj[propName] === null || strippedobj[propName] === undefined || strippedobj[propName] == '' ) {
			  delete strippedobj[propName];
					}
		  		}
			  return strippedobj ;
			} ;
        
        return conffactory;
    };
    
    configFactory.$inject = ['$http', '$localStorage', '$timeout', 'urls','dataFactory'];
        
    angular.module('templateApp').factory('callLogic', configFactory);
                                           
}());