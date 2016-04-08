'use strict';

angular.module('appDirectives').directive('userProfileControl', function() {

	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/UserProfileTemplate.html',
		controller: ['$scope', function($scope) {
			$scope.username = "John Vacca";
		}]
	};

});