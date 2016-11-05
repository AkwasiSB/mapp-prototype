angular.module('profilePage.controller', [])



.controller('uploadModalCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
	// store data from jquery-file-upload plugin when uploading a file
    var uploadData = {};

    var intervar;

    // for toggling the visibility state of dom elements
	$scope.startUpload = false;
    $scope.startProc = false;

	// progress and loop bar percentage
	$scope.cProgress = 0;
    $scope.cLoop = 0;
    $scope.cTimer = 0;

	function roundLoader() {
        intervar = $interval(function() {
            $scope.cLoop += 1;
            $scope.cTimer += 1;

            if ($scope.cLoop == 100) {
                $scope.cLoop = 0;
            }
        }, 1000);
    }

    // listen for the start of an upload
    $scope.$on('mappUploadStart', function(e, data) {
    	uploadData = data;
    	$scope.startUpload = true;
    	$scope.$digest();
    });

    // listen for upload progress
    $scope.$on('mappUploadProgress', function(e, data) {
    	$scope.cProgress = data;

        if (data == 100) {
            $scope.startUpload = false;
            $scope.startProc = true;
        }

        $scope.$digest();

        roundLoader();
    });

    // listen for successful upload
    $scope.$on('mappUploadSuccess', function(e, data) {
        $scope.$apply(function() {
            $scope.startUpload = false;
            $scope.startProc = false;
            $scope.cProgress = 0;
            $scope.cLoop = 0;
            $scope.cTimer = 0;

            $interval.cancel(intervar);
        });
    });

    // listen for error during an upload
    $scope.$on('mappUploadError', function(e, data) {
        var message;

        $scope.startUpload = false;
        $scope.startProc = false;
        $scope.cProgress = 0;
        $scope.cLoop = 0;
        $scope.cTimer = 0;

        if (intervar) {
            $interval.cancel(intervar);
        }

        if (data == 'error') {
            message = 'An unknown error occured while uploading the file. Retry';
        }
        else if (data == 'abort') {
            message = 'File upload cancelled';
        }
        else if (data == 'filetypeErr') {
            message = 'Filetype not supported';
        }
        else if (data == 'Payload Too Large') {
            message = 'Filesize has exceeded max limit';
        }

        $('.notification').css({ background: 'red', display: 'block' });
        $('.notifytext').html(message);

        $timeout(function () {
            $('.notification').css({ background: 'none', display: 'none' });
            $('.notifytext').html('');
        }, 5000);
    });

    // styles for styling the round progressbar
    $scope.getStyle = function() {
        var transform = 'translateY(-50%) translateX(-50%)';

        return {
            'top': '50%',
            'bottom': 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform,
            'font-size': 100/5.2 + 'px'
        };
    };

    // function for cancelling an ongoing upload if any
    $scope.cancelUpload = function() {
    	uploadData.jqXHR.abort();
    };
}])



.controller('profilePageCtrl', ['$scope', '$window', '$timeout', 'ngDialog', function($scope, $window, $timeout, ngDialog) {
	var ngDiag;
    $scope.pcModels = [];

    $scope.showUploadModal = function() {
        ngDiag = ngDialog.open({
        	template: 'templateId',
        	controller: 'uploadModalCtrl',
        	className: 'ngdialog-theme-default'
        });
    };

    $scope.loadPCModel = function(modelURL) {
        $window.location.assign(modelURL);
    };

    // listen for successful upload
    $scope.$on('mappUploadSuccess', function(e, data) {
        var model = data;

        $scope.pcModels.push(model);

        ngDiag.close();
    });

    // listen for error during an upload
    $scope.$on('mappUploadError', function(e, data) {
        ngDiag.close();
    });
}]);
