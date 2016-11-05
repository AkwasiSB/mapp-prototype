angular.module('mapp-upload', [])



// mapp upload service for the mapp-upload directive
.factory('mappUploadService', ['$rootScope', function($rootScope) {
    return {
        startUpload: function(data) {
            // upload only one file
            var file = data.files[0];

            // support only point cloud files
            var regexp = /(\.|\/)(las|laz|e57|xyz|ply|dxf|dwg|jpg)$/i;

            // upload data info object
            var fileUpload = {};

            // Using the filename extension for our test
            if (!regexp.test(file.name)) {
                // broadcast filetype error
                $rootScope.$broadcast('mappUploadError', 'filetypeErr');

                return;
            }

            // check filesize max limit
            if (file.size > 2147483648) {
                // broadcast filesize error
                $rootScope.$broadcast('mappUploadError', 'filesizeErr');

                return;
            }

            fileUpload.jqXHR = data.submit()
            .success(function(result, textStatus, jqXHR) {
                // broadcast upload success event passing in return data from server
                $rootScope.$broadcast('mappUploadSuccess', result);
            })
            .error(function(jqXHR, textStatus, error) {
                // broadcast upload error event passing in error message
                $rootScope.$broadcast('mappUploadError', error);
            });

            fileUpload.filename = file.name;

            // broadcast upload start event passing in upload data info object
            $rootScope.$broadcast('mappUploadStart', fileUpload);
        },

        uploadProgress: function(progress) {
            // broadcast upload progress event passing in progress percentage complete
            $rootScope.$broadcast('mappUploadProgress', progress);
        }
    };
}])



// mapp upload attribute directive
.directive('mappUpload', ['mappUploadService', function(mappUploadService) {
	return {
		restrict: 'A',

        scope: {
            uploadUrl: '@'
        },

        link: function (scope, element, attrs) {
        	// initialise jquery-file-upload pluging on the input file
            $(element).fileupload({
                // url to upload file to
            	url: scope.uploadUrl,

                // return data type from destination server
            	dataType: 'json',

                // file uploads are sent as multipart/form-data
            	multipart: true,

                // function to be called when a file is selected
            	add: function(e, data) {
            		mappUploadService.startUpload(data);
                },

                // function to be called when upload is in progress
                progressall: function(e, data) {
                	var progress = parseInt(data.loaded / data.total * 100, 10);
                	mappUploadService.uploadProgress(progress);
                }
			});
		}
	};
}]);
