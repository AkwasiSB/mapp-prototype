angular.module('profilePage.controller', [])



.controller('profilePageCtrl', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
	var map = new google.maps.Map(document.getElementById('gmap'), {
        	center: {lat: 54.582, lng: -4.120},
        	zoom: 6,
        	draggable: false,
      		mapTypeControl: false,
      		scaleControl: false,
      		navigationControl: true,
      		streetViewControl: false
        });

	// Minimap control
	var miniMapControlDiv = document.createElement('div');

	var miniMapButton = document.createElement('button');;
	miniMapButton.style.backgroundColor = '#fff';
	miniMapButton.style.cursor = 'pointer';
    miniMapButton.style.boxShadow = '0px 1px 4px -1px rgba(0, 0, 0, 0.3)';
    miniMapButton.style.borderRadius = '2px';
	miniMapButton.style.width = '75px';
	miniMapButton.style.height = '75px';
    miniMapButton.style.border = '3px solid #fff';
    miniMapButton.style.outline = 'none';
    miniMapButton.style.padding = '0';
	miniMapButton.style.marginLeft = '10px';
    miniMapButton.style.marginBottom = '10px';
	miniMapButton.style.top = '0px';
	miniMapButton.title = 'Satellite';
	miniMapControlDiv.appendChild(miniMapButton);

	var miniMapBox = document.createElement('div');
	miniMapBox.style.height = '100%';
	miniMapBox.style.zIndex = '9999';
	miniMapButton.appendChild(miniMapBox);

	var minimap = new google.maps.Map(miniMapBox, {
			mapTypeId: google.maps.MapTypeId.SATELLITE,
        	center: {lat: 54.582, lng: -4.120},
        	zoom: 6,
        	draggable: false,
      		mapTypeControl: false,
      		scaleControl: false,
      		navigationControl: false,
      		streetViewControl: false,
      		zoomControl: false,
        });

	miniMapButton.addEventListener('click', function() {
	    console.log('miniMapButton');
	});

	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(miniMapControlDiv);

	google.maps.event.addListener(minimap, 'idle', function(){
	    minimap.setCenter({lat: 54.582, lng: -4.120});
	    minimap.setZoom(4);
		google.maps.event.trigger(minimap, 'resize');
	});

	// My location control
	var locationControlDiv = document.createElement('div');

	var locationButton = document.createElement('button');
    locationButton.style.backgroundColor = '#fff';
    locationButton.style.border = 'none';
    locationButton.style.outline = 'none';
    locationButton.style.width = '28px';
    locationButton.style.height = '28px';
    locationButton.style.borderRadius = '2px';
    locationButton.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.3)';
    locationButton.style.cursor = 'pointer';
    locationButton.style.marginRight = '10px';
    locationButton.style.padding = '0';
    locationButton.title = 'Your Location';
    locationControlDiv.appendChild(locationButton);

    var locationImage = document.createElement('div');
    locationImage.style.margin = '5px';
    locationImage.style.width = '24px';
    locationImage.style.height = '26px';
    locationImage.style.backgroundImage = 'url(../../images/location-marker.png)';
    locationImage.style.backgroundSize = '14px 18px';
    locationImage.style.backgroundPosition = '1.5px 0';
    locationImage.style.backgroundRepeat = 'no-repeat';
    locationButton.appendChild(locationImage);

	locationButton.addEventListener('click', function() {
	    console.log('locationButton');
	});

	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationControlDiv);

	// Map Tools control
	var mapToolsControlDiv = document.createElement('div');

	var mapToolsButton = document.createElement('button');
    mapToolsButton.style.backgroundColor = '#fff';
    mapToolsButton.style.border = 'none';
    mapToolsButton.style.outline = 'none';
    mapToolsButton.style.width = '158px';
    mapToolsButton.style.height = '30px';
    mapToolsButton.style.borderRadius = '2px';
    mapToolsButton.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.3)';
    mapToolsButton.style.cursor = 'pointer';
    mapToolsButton.style.marginRight = '10px';
    mapToolsButton.style.marginBottom = '10px';
    mapToolsButton.style.padding = '0';
    mapToolsButton.title = 'Show Imagery';
    mapToolsControlDiv.appendChild(mapToolsButton);

    var mapToolsImage = document.createElement('div');
    mapToolsImage.style.margin = '5px';
    mapToolsImage.style.width = '148px';
    mapToolsImage.style.height = '28px';
    mapToolsImage.style.backgroundImage = 'url(../../images/icon-sprite.png), url(../../images/caret-up.png)';
    mapToolsImage.style.backgroundSize = '128px 28px, 11px 8px';
    mapToolsImage.style.backgroundPosition = '0 -3px, 134px 6px';
    mapToolsImage.style.backgroundRepeat = 'no-repeat, no-repeat';
    mapToolsButton.appendChild(mapToolsImage);

	mapToolsButton.addEventListener('click', function() {
	    console.log('mapToolsButton');
	});

	map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(mapToolsControlDiv);

    $scope.showMenu = function() {
    	$('.settings-background').addClass('open');
    	$('.settings').addClass('open');
    };

    $scope.hideMenu = function() {
    	$('.settings-background').removeClass('open');
    	$('.settings').removeClass('open');
    };

    $('.settings').on('click', function(e) {
    	e.stopPropagation();
    	e.preventDefault();
    });

	$('ul.dropdown-menu').on('click', function(event) {
	    var events = $._data(document, 'events') || {};
	    events = events.click || [];

	    for(var i = 0; i < events.length; i++) {
	        if(events[i].selector) {
				if($(event.target).is(events[i].selector)) {
	                events[i].handler.call(event.target, event);
	            }

	            $(event.target).parents(events[i].selector).each(function() {
	                events[i].handler.call(this, event);
	            });
	        }
	    }

	    event.stopPropagation();
	});
}]);
