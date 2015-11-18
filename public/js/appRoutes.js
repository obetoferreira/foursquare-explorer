angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/heat-map', {
			templateUrl: 'views/heat-map.html',
			controller: 'HeatMapController'
		})

		.when('/top-5', {
			templateUrl: 'views/top-5.html',
			controller: 'TopFiveController'	
		});

	$locationProvider.html5Mode(true);

}]);