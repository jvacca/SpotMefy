'use strict';

angular.module('appDirectives').directive('tableViewControl', function() {

	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/TableViewTemplate.html',
		controller: ['$scope', 'favoritesService', function($scope, favoritesService) {
			$scope.order = function(predicate) {
				$scope.predicate = predicate;
			};

			$scope.predicate = 'id';
			$scope.reverse = false;
			$scope.toggleButton = true;

			$scope.addToFavorites = function(song) {		
				favoritesService.addToFavorites(song);
			};

			$scope.removeFromFavorites = function(index) {
				favoritesService.removeFromFavorites(index);
			};

			$scope.play = function(song) {
				var event = 'handlePlayBroadcast';
				favoritesService.broadcast(event, song);
			};

			$scope.hover = function(index) {
				$("#btn_play_r" + index).css("opacity", 1);
				$("#btn_add_r" + index).css("opacity", 1);
			};

			$scope.hoverOut = function(index) {
				$("#btn_play_r" + index).css("opacity", 0);
				$("#btn_add_r" + index).css("opacity", 0);
			};
		}]
	};

});

