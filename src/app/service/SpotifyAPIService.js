'use strict';

angular.module('appServices').factory('spotifyAPIService', ['$resource', function($resource) {

	return $resource('https://api.spotify.com/v1/artists/:id');

}]);