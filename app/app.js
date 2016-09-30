(function () {
    'use strict';

    angular.module('templateApp', ['treeControl','ui.bootstrap',
        'ngStorage',
        'ngRoute', 
        'angular-loading-bar'
       
    ]) 
        .constant('urls', {
            BASE: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev',
            BASE_API: 'https://io.bidvestfm.co.za/BIDVESTFM_WEBAPPS/dev'
        })
        .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'BaseController',
                templateUrl: 'app/views/base.html'
            })
            .when('/login', {
                controller: 'BaseController',
                templateUrl: 'app/views/login.html'
            })
			.when('/Search/', {
                controller: 'searchController',
                templateUrl: 'app/views/searchlist.html'
			})
		    .when('/PickList/', {
                controller: 'picklistController',
                templateUrl: 'app/views/picklist.html'
			})
            .when('/FreeText', {
                controller: 'freetextController',
                templateUrl: 'app/views/freetext.html'
            })
            .when('/Tree', {
                controller: 'treelistController',
                templateUrl: 'app/views/treelist.html'
            })
            .when('/Routing', {
                controller: 'routingController',
                templateUrl: 'app/views/routing.html'
            })
            .when('/DatePicker', {
                 controller: 'datepickingController',
                 templateUrl: 'app/views/pickadate.html'
             })
            .when('/Fileloader', {
                controller: 'fileloaderController',
                templateUrl: 'app/views/uploader.html'
            })
            .when('/createcall', {
                controller: 'createcallController',
                templateUrl: 'app/views/createcall.html'
            })
            .when('/regprocess', {
                controller: 'BaseController',
                templateUrl: 'app/views/regprocess.html'
            })
          .when('/signup', {
                controller: 'SignUpController',
                templateUrl: 'app/views/signup.html'
            })
            .otherwise( { redirectTo: '/' } );
    });
     
}());