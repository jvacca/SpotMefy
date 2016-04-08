'use strict';

angular.module('appDirectives').directive('mediaControlsControl', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/MediaControlsTemplate.html',
		controller: ['$scope', 'queueService', function($scope, queueService) {

			$scope.currentSong = 'whateva';
			var audioSource = $("#srcFile"); 
			var audioPlayer = document.getElementById("audioElement");

			$scope.$on('handlePlayBroadcast', function(event, song) {
				console.dir(song.track.preview_url);
				$scope.currentSong = song.track.preview_url;
				audioSource.attr("src", $scope.currentSong);
				audioPlayer.load();
				audioPlayer.play();
			});
		
		}]
	};
});