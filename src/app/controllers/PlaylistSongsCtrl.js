'use strict';

angular.module('appControllers').controller('playlistSongsCtrl', ['$scope', '$routeParams', 'spotifyAPIService', 'queueService', function($scope, $routeParams, spotifyAPIService, queueService) {

	$scope.data = spotifyAPIService.get({jsonName: $routeParams.playlistId}, function(song) {
		//
    });

	$scope.order = function(predicate) {
		$scope.predicate = predicate;
	};

	$scope.predicate = 'id';
	$scope.reverse = false;

	$scope.addSong = function(song) {		
		queueService.addToQueue(song);
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