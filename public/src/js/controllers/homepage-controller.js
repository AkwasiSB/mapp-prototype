angular.module('homePage.controller', [])



.controller('homePageCtrl', ['$scope', '$location', function($scope, $location) {
	$('.navbar-default .navbar-collapse').on('show.bs.collapse', function(e) {
        $('.navbar-default .navbar-collapse').not(this).collapse('hide');
    });

    $scope.signIn = function () {
    	$location.path('signin');
    };

    $scope.signUp = function () {
    	$location.path('signup');
    };

    $scope.createCompany = function () {
    	$location.path('create');
    };
}]);