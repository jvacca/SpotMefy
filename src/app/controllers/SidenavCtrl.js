'use strict';

angular.module('appControllers').controller('sidenavCtrl', ['$scope', '$location', 'spotifyAPIService', function($scope, $location, spotifyAPIService) {

	$scope.data = spotifyAPIService.query();

	$scope.navigate = function(dest, index) {
		$location.path(dest);

		var name;
		if (index === undefined) {
			name = "btn_" + dest.slice(1);
		} else {
			name = "btn_playlist" + index;
		}
		//$(".sidenav-container > a").css("color", "#adafb2");
		$(".selected").css("background", "#282828");

		//$("#" + name).css("color", "#fff")
		$("#" + name + " > .selected").css("background", "#19b955");
	};

}]);