'use strict';

var app = angular.module('spotmefy', ['ngRoute', 'appControllers', 'appServices', 'appDirectives']);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appServices = angular.module('appServices', ['ngResource']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/main', {
		templateUrl: 'partials/partial_browse.html',
		controller: 'browseCtrl'
	}).
	when('/browse', {
		templateUrl: 'partials/partial_browse.html',
		controller: 'browseCtrl'
	}).
	when('/songs', {
		templateUrl: 'partials/partial_songs.html',
		controller: 'songsCtrl'
	}).
	when('/playlist_songs/:playlistId', {
		templateUrl: 'partials/partial_playlist_songs.html',
		controller: 'playlistSongsCtrl'
	}).
	otherwise({
		redirectTo: '/main'
	});

}]);

'use strict';

angular.module('appControllers').controller('browseCtrl', ['$scope', 'spotifyAPIService', function($scope, spotifyAPIService) {
	
	$scope.data = spotifyAPIService.get({jsonName: 'categories'}, function(song) {
		//
    });

}]);
'use strict';

angular.module('appControllers').controller('mediaControlsCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.currentSong = 'whateva';
	var audioSourcet = $("#srcFile");
	var audioPlayer = document.getElementById("audioElement");

	$scope.$on('handlePlayBroadcast', function(event, song) {
		console.dir(song.track.preview_url);
		$scope.currentSong = song.track.preview_url;
		audioSourcet.attr("src", $scope.currentSong);
		audioPlayer.load();
		audioPlayer.play();
	});

	
}]);
'use strict';

angular.module('appControllers').controller('nowPlayingCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.currentSong = 'Song Title';
	$scope.currentArtist = 'Artist Name';
	$scope.currentAlbumImage = 'images/img_sample_album.png';

	$scope.$on('handlePlayBroadcast', function(event, song) {
		$scope.currentSong = song.track.name;
		$scope.currentArtist = song.track.artists[0].name;
		$scope.currentAlbumImage = song.track.album.images[2].url;
	});
}]);
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
'use strict';

angular.module('appControllers').controller('songsCtrl', ['$scope', 'queueService', function($scope, queueService) {
	
	$scope.data = queueService.getQueueList();

	$scope.order = function(predicate) {
		$scope.predicate = predicate;
	};

	$scope.predicate = 'id';
	$scope.reverse = false;

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
'use strict';

angular.module('appControllers').controller('topnavCtrl', ['$scope', 'queueService', function($scope, queueService) {

	$scope.data = {};
	$scope.data.username = 'John Vacca';

}]);
'use strict';

angular.module('appControllers').directive('playlistSongsCtrl', ['$scope', '$routeParams', 'spotifyAPIService', 'queueService', function($scope, $routeParams, spotifyAPIService, queueService) {

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


'use strict';

angular.module('appServices').service('queueService', ['$rootScope', function($rootScope) {

	var queueArray = [];
	var currentSongURL = '';


	this.addToQueue = function(song) {
		queueArray.push(song);
	};

	this.removeFromQueue = function(index) {
		queueArray.slice(index, 1);
	};

	this.getQueueList = function() {
		return queueArray;
	};

	this.broadcast = function(msg) {
        $rootScope.$broadcast('handlePlayBroadcast', msg); 
    };
}]);
'use strict';

angular.module('appServices').factory('spotifyAPIService', ['$resource', function($resource) {

	return $resource('data/:jsonName.json', {}, {
		query: {method:'GET', params:{jsonName:'config'}, isArray:false}
	});

}]);