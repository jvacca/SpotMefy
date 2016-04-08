angular.module('appDirectives').directive('nowPlayingControl', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/NowPlayingTemplate.html',
		controller: ['$scope', function($scope) {
			$scope.currentSong = 'Song Title';
			$scope.currentArtist = 'Artist Name';
			$scope.currentAlbumImage = 'images/img_sample_album.png';

			$scope.$on('handlePlayBroadcast', function(event, song) {
				$scope.currentSong = song.track.name;
				$scope.currentArtist = song.track.artists[0].name;
				$scope.currentAlbumImage = song.track.album.images[2].url;
			});
		}]
	};
});
