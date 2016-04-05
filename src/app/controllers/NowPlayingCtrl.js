'use strict';

angular.module('appControllers').controller('nowPlayingCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.currentSong = 'Song Title';
	$scope.currentArtist = 'Artist Name';
	$scope.currentAlbumImage = '';

	$scope.$on('handlePlayBroadcast', function(event, song) {
		$scope.currentSong = song.track.name;
		$scope.currentArtist = song.track.artists[0].name;
		$scope.currentAlbumImage = song.track.album.images[2].url;
	});
}]);