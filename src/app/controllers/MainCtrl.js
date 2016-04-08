'use strict';

angular.module('appControllers').controller('mainCtrl', ['$scope', 'resourceService', 'favoritesService', function($scope, resourceService, favoritesService) {
	
	$scope.configData = resourceService.get({jsonName: 'config'}, function(data) {
		$scope.username = $scope.configData.username; 
		favoritesService.broadcast('applicationConfigLoaded', $scope.configData);
    });

}]);