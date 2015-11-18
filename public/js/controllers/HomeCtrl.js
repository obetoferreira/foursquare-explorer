angular.module('HomeCtrl', []).controller('HomeController', function($scope, homeFactory, $mdBottomSheet, $mdDialog) {

	$scope.category = $scope.category || 'sushi';
	$scope.distance = $scope.distance ||  500;

	// GeoLocation
	navigator.geolocation.getCurrentPosition(function(position) {
		$scope.latLng = position.coords.latitude + ',' +  position.coords.longitude;
		$scope.getPlaces();
		$scope.renderMap();
	});

	// Get 
	$scope.getPlaces = function( args ){
		if ( !args ) {
			args = { latLng: $scope.latLng, category: $scope.category, distance: $scope.distance }
		}
		homeFactory.getPlaces(args)
			.success(function(data){
				$scope.places = data.response.venues;
			})
			.error(function(err){
				$scope.status = err.message;
			});
	}

	// Update
	$scope.updatePlaces = function( args ){
		$scope.hideBottomSheet();
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
		var tilejson = {
		  "tiles": [ "https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidHJpc3RlbiIsImEiOiJuZ2E5MG5BIn0.39lpfFC5Nxyqck1qbTNquQ" ],
		  "minzoom": 0,
		  "maxzoom": 18
		}
		L.mapbox.map('map', tilejson, {
		    scrollWheelZoom: false
		}).setView([-19.9190936,-44.0012427], 15);
	};

	$scope.showDialog = function($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         template:
           '<md-dialog aria-label="List dialog">' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
           controller: 'HomeController'
      });
	}

	$scope.closeDialog = function() {
        $mdDialog.hide();
    }

});