angular.module('userAccount.controller', [])



.controller('uacCtrl', ['$scope', '$location', function($scope, $location) {
	if ($location.path() == '/signup') {
		$scope.hideSignUp = false;
	} else {
		$scope.hideSignUp = true;

		if ($location.path() == '/create') {
			$scope.createLabel = true;
		}
	}

	$('.navbar-default .navbar-collapse').on('show.bs.collapse', function(e) {
        $('.navbar-default .navbar-collapse').not(this).collapse('hide');
    });

    $scope.gotoProfile = function() {
    	$location.path('profile');
    }

    $scope.signIn = function() {
    	$scope.hideSignUp = true;
    }

    $scope.signUp = function() {
    	$scope.hideSignUp = false;
		$scope.createLabel = false;
    }
}]);