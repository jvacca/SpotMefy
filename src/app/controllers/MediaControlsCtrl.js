'use strict';

angular.module('appControllers').controller('mediaControlsCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.currentSong = '';

	$scope.$on('handlePlayBroadcast', function(event, song) {
		$scope.currentSong = song.preview_url;
		
	});
}]);