'use strict';

angular.module('appServices').factory('resourceService', ['$resource', function($resource) {

	return $resource('data/:jsonName.json', {}, {
		query: {method:'GET', params:{jsonName:'config'}, isArray:false}
	});

}]);