angular.module('HomeCtrl', []).controller('HomeController', function($scope, homeFactory, $mdBottomSheet, $mdDialog) {

	$scope.category = $scope.category || 'sushi';
	$scope.distance = $scope.distance ||  3000;

	// GeoLocation
	navigator.geolocation.getCurrentPosition(function(position) {
		// Latitude and Longitude
		$scope.lat = position.coords.latitude;
		$scope.lng = position.coords.longitude;

		if ( $scope.lat && $scope.lng ) {
			// Map
			$scope.renderMap();
		} else {
			alert('Please, enable your geolocation.');
		}
	});

	// Get 
	$scope.getPlaces = function( callback ){
		args = {
			lat: $scope.lat,
			lon: $scope.lng,
			category: $scope.category, 
			distance: $scope.distance
		};

		homeFactory.getPlaces(args)
			.success(function(data){
				$scope.places = data.response.venues;
				callback();
			})
			.error(function(err){
				$scope.places = err.message;
			});
	}

	// Update
	$scope.renderMarkers = function( ){
		// Main Marker
		$scope.map.eachLayer(function(layer) {
		  if (layer instanceof L.Marker) {
		    $scope.map.removeLayer(layer);
		  }
		});
		L.marker([$scope.lat, $scope.lng], {
			icon: L.mapbox.marker.icon({
				'marker-size': 'large',
				'marker-symbol': 'star',
				'marker-color': '#fa0'
			})
		}).addTo($scope.map);
		// Places Layers
		$scope.getPlaces(function(){
			if ($scope.places) {
				for (var i = 0; i < $scope.places.length; i++) {
					var place = $scope.places[i],
						popupText = '';

					if ( place.name ) {
						popupText = popupText + '<h2>' + place.name + '</h2>';
					}
					if ( place.location.address ) {
						popupText = popupText + '<p><b>Endereço:</b> ' + place.location.address + '</p>';
					}
					if ( place.contact.formattedPhone ) {
						popupText = popupText + '<p><b>Telefone:</b> ' + place.contact.formattedPhone + '</p>';
					}
					if ( place.stats.checkinsCount ) {
						popupText = popupText + '<p><i><small>Checkins: ' + place.stats.checkinsCount + '</small></i></p>';
					}
					console.log( place );
					L.marker([place.location.lat, place.location.lng])
						.bindPopup(popupText)
						.addTo($scope.map);
				}
			}
		});
	}
	$scope.updatePlaces = function( ){
		$scope.hideBottomSheet();
		$scope.renderMarkers();
	}

	// BottomSheet
	$scope.showBottomSheet = function(template, $event) {
		$mdBottomSheet.show({
			templateUrl: '../../views/' + template,
			scope: $scope.$new(true)
		});
	}
	$scope.hideBottomSheet = function() {
		$mdBottomSheet.hide();
	}
	$scope.cancelBottomSheet = function() {
		$mdBottomSheet.cancel();
	}

	$scope.renderMap = function() {
		L.mapbox.accessToken = 'pk.eyJ1Ijoib2JldG9mZXJyZWlyYSIsImEiOiJjaWgyMnFucG4weGY2dnFtMzlpZDZnaTdmIn0.BlXsoPukIgpiCxVS1ORXCg';
		// map
		$scope.map = L.mapbox.map('map', 'mapbox.streets')
			.setView([$scope.lat, $scope.lng], 15);
		// Disable wheel Scroll
		$scope.map.scrollWheelZoom.disable();
		// Markers
		$scope.renderMarkers();
	};

});