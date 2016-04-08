'use strict';

angular.module('appControllers').controller('songsCtrl', ['$scope', 'favoritesService', function($scope, favoritesService) {
	$scope.type = "favorites";
	$scope.rows = favoritesService.getFavorites();

}]);