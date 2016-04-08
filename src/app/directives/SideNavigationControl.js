angular.module('appDirectives').directive('sideNavigationControl', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/SideNavigationTemplate.html',
		controller: ['$scope', '$location', function($scope, $location) {
			//
			
			$scope.$on('applicationConfigLoaded', function(event, data) {
				$scope.data = data;
			});

			$scope.navigate = function(dest, btnName) {
				$location.path(dest);

				
				//$(".sidenav-container > a").css("color", "#adafb2");
				$(".selected").css("background", "#282828");

				//$("#" + name).css("color", "#fff")
				$("#" + btnName + " > .selected").css("background", "#19b955");
			};
		}]
	};
});