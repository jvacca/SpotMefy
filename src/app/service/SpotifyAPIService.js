'use strict';

angular.module('appServices').factory('spotifyAPIService', ['$resource', function($resource) {

	return $resource('data/:jsonName.json', {}, {
		query: {method:'GET', params:{jsonName:'config'}, isArray:false}
	});

}]);