/* angular.module(wistiaApp) is a global place for creating, registering and retrieving 
Angular modules */
var mappApp = angular.module('mappApp', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngDialog', 'angular-svg-round-progressbar', 'angular-loading-bar', 'mapp-upload', 'mapp.filters', 'homePage.controller', 'userAccount.controller', 'profilePage.controller']);



// app config phase
mappApp.config(['$routeProvider', 'cfpLoadingBarProvider', function ($routeProvider, cfpLoadingBarProvider) {
	// configure loading bar to hide spinner
	cfpLoadingBarProvider.includeSpinner = false;

	// set up page routing
	$routeProvider
	.when('/', {
		controller: 'homePageCtrl',
		templateUrl: 'templates/homepage.html'
	})
	.when('/signin', {
		controller: 'uacCtrl',
		templateUrl: 'templates/useraccount.html'
	})
	.when('/signup', {
		controller: 'uacCtrl',
		templateUrl: 'templates/useraccount.html'
	})
	.when('/create', {
		controller: 'uacCtrl',
		templateUrl: 'templates/useraccount.html'
	})
	.when('/profile', {
		controller: 'profilePageCtrl',
		templateUrl: 'templates/profilepage.html'
	})
	.otherwise({redirectTo: '/'});
}]);