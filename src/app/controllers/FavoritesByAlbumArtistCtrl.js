'use strict';

angular.module('appControllers').controller('favoritesByAlbumArtistCtrl', ['$scope', '$routeParams', 'favoritesService', 'spotifyAPIService', function($scope, $routeParams, favoritesService, spotifyAPIService) {
	$scope.type = "favorites";
	var id, data; 

	if ($routeParams.which == 'album') {
		$scope.rows = favoritesService.getTracksByAlbumId($routeParams.id);
		$scope.name = $scope.rows[0].track.album.name;
		$scope.imageUrl = $scope.rows[0].track.album.images[1].url;
	} else {
		$scope.rows = favoritesService.getTracksByArtistId($routeParams.id);
		$scope.name = $scope.rows[0].track.artists[0].name;

		id = $scope.rows[0].track.artists[0].id;
		data = spotifyAPIService.get({id:id}, function(resp) {
			$scope.imageUrl = resp.images[0].url;
	    });
	}

}]);
