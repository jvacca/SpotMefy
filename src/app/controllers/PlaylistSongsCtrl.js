'use strict';

angular.module('appControllers').controller('playlistSongsCtrl', ['$scope', '$routeParams', 'resourceService', function($scope, $routeParams, resourceService) {
	$scope.type = "playlist";

	$scope.data = resourceService.get({jsonName: $routeParams.playlistId}, function(song) {
		$scope.rows = $scope.data.items;
    });

}]);