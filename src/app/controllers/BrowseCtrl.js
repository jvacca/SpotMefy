'use strict';

angular.module('appControllers').controller('browseCtrl', ['$scope', '$location', 'resourceService', function($scope, $location, resourceService) {
	
	$scope.data = resourceService.get({jsonName: 'categories'}, function(song) {
		// 
    });

    $scope.getArtist = function(id) {
    	$location.path('/view_artist/id');
    };

    $scope.getAlbum = function(id) {
    	$location.path('/view_album/id');
    };

}]);