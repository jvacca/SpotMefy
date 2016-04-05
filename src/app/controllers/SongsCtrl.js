'use strict';

angular.module('appControllers').controller('songsCtrl', ['$scope', 'queueService', function($scope, queueService) {
	
	$scope.data = queueService.getQueueList();

	$scope.removeSongFromQueue = function(index) {
		queueService.removeFromQueue(index);
	};

	$scope.play = function(song) {
		queueService.broadcast(song);
	};

	$scope.hover = function(index) {
		$("#btn_play_r" + index).css("opacity", 1);
	};

	$scope.hoverOut = function(index) {
		$("#btn_play_r" + index).css("opacity", 0);
	};

}]);