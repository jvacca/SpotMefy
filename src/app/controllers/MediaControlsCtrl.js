'use strict';

angular.module('appControllers').controller('mediaControlsCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.currentSong = 'whateva';
	var audioSourcet = $("#srcFile");
	var audioPlayer = document.getElementById("audioElement");

	$scope.$on('handlePlayBroadcast', function(event, song) {
		console.dir(song.track.preview_url);
		$scope.currentSong = song.track.preview_url;
		audioSourcet.attr("src", $scope.currentSong);
		audioPlayer.load();
		audioPlayer.play();
	});

	
}]);