'use strict';

angular.module('appControllers').controller('browseCtrl', ['$scope', 'spotifyAPIService', function($scope, spotifyAPIService) {
	
	$scope.data = spotifyAPIService.get({jsonName: 'categories'}, function(song) {
		console.log($scope.data)
    });

}]);