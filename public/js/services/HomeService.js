angular.module('HomeService', []).factory('homeFactory', ['$http', function($http) {

	var dataFactory = {},
		clientId = 'VXVU4M13UQKYPFFWQ4QWUQWUDGRJXYYMYWV0MVRSIZS5C1XM',
		clientSecret = 'WQBBBHFAXTXLMFYWCESJWHNFPZWVR3EXO01NBABG3O0YWH1S';

	dataFactory.getPlaces = function(args) {
		urlBase = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20130815&ll=' + args.latLng + '&query=' + args.category + '&radius=' + args.distance;
		return $http.get(urlBase);
	}

	return dataFactory;

}]);