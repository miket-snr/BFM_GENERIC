 
 (function () {
    'use strict';

    var configFactory = function($http, $localStorage,$timeout, urls,dataFactory) {
    
        var conffactory = {};
        alert('I am here') ;
		
		conffactory.currentsection = '' ;
		conffactory.currentsectionlist = [] ;
		conffactory.currentconfigline =  {} ;
		conffactory.callcontext = {};
		conffactory.currentsequencenmbr = 0 ;
		conffactory.contractcode = 'BASE' ;
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
            return ;
        };
		 conffactory.buildDataUrl = function () {
            return ;
        };
		 conffactory.buildHeading = function (atSection) {
            return ;
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
		
        return conffactory;
    };
    
    configFactory.$inject = ['$http', '$localStorage', '$timeout', 'urls','dataFactory'];
        
    angular.module('templateApp').factory('callLogic', configFactory);
                                           
}());