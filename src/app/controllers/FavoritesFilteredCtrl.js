'use strict';

angular.module('appControllers').controller('favoritesFilteredCtrl', ['$scope', '$location', '$routeParams', 'favoritesService', 'spotifyAPIService', function($scope, $location, $routeParams, favoritesService, spotifyAPIService) {
	$scope.type = "favorites";
	var data, id, arr; 

	$scope.filterId = $routeParams.filterId;
	$scope.which = ($scope.filterId == 'artists');

	if ($scope.which === true) {
		$scope.artists = favoritesService.getArtists();
	} else {
		$scope.albums = favoritesService.getAlbums();
	}

	$scope.getArtist = function(id) {
		$location.path('/view_tracksby/artist/' + id);
	};

	$scope.getAlbum = function(id) {
		$location.path('/view_tracksby/album/' + id);
	};
	
}]);