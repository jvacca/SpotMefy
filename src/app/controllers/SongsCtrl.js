'use strict';

angular.module('appControllers').controller('songsCtrl', ['$scope', 'favoritesService', function($scope, favoritesService) {
	
	$scope.rows = favoritesService.getFavorites();

}]);