'use strict';

angular.module('appControllers').controller('topnavCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.data = {};
	$scope.data.username = 'John Vacca';

}]);