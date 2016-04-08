'use strict';

angular.module('appControllers').controller('favoritesByAlbumArtistCtrl', ['$scope', '$routeParams', 'favoritesService', function($scope, $routeParams, favoritesService) {

	if ($routeParams.which == 'album') {
		$scope.rows = favoritesService.getTracksByAlbumId($routeParams.id);
		$scope.name = $scope.rows[0].track.album.name;
	} else {
		$scope.rows = favoritesService.getTracksByArtistId($routeParams.id);
		$scope.name = $scope.rows[0].track.artists[0].name;
	}

}]);
