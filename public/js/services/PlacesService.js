angular.module('PlacesService', []).factory('placesFactory', ['$http', function($http) {

	var dataFactory = {},
		clientId = 'VXVU4M13UQKYPFFWQ4QWUQWUDGRJXYYMYWV0MVRSIZS5C1XM',
		clientSecret = 'WQBBBHFAXTXLMFYWCESJWHNFPZWVR3EXO01NBABG3O0YWH1S';

	dataFactory.getPlaces = function(args) {
		if (!args.amount) {
			urlBase = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20130815&ll=' + args.lat + ',' + args.lon + '&query=' + args.category + '&radius=' + args.distance;
		} else if (!args.category) {
			urlBase = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20130815&ll=' + args.lat + ',' + args.lon + '&limit=' + args.amount + '&radius=' + args.distance;
		} else {
			urlBase = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20130815&ll=' + args.lat + ',' + args.lon + '&query=' + args.category + '&limit=' + args.amount + '&radius=' + args.distance;
		}
		return $http.get(urlBase);
	}

	return dataFactory;

}]);