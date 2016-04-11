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
	when('/favorites_filtered/:filterId', {
		templateUrl: 'partials/partial_songs_filtered.html',
		controller: 'favoritesFilteredCtrl'
	}).
	when('/view_tracksby/:which/:id', {
		templateUrl: 'partials/partial_favorites_by_AlbumArtist.html',
		controller: 'favoritesByAlbumArtistCtrl'
	}).
	otherwise({
		redirectTo: '/main'
	});

	var maxHeight = $(window).height();
	var containerHeight = $(".container").height();

	$(".content-panel").css("height", maxHeight - 91);

	$(".sidepanel").css("height", maxHeight - 92); 

}]);




'use strict';

angular.module('appControllers').controller('browseCtrl', ['$scope', '$location', 'resourceService', function($scope, $location, resourceService) {
	
	$scope.data = resourceService.get({jsonName: 'categories'}, function(song) {
		// 
    });

    $scope.getArtist = function(id) {
    	$location.path('/view_artist/id');
    };

    $scope.getAlbum = function(id) {
    	$location.path('/view_album/id');
    };

}]);
'use strict';

angular.module('appControllers').controller('favoritesByAlbumArtistCtrl', ['$scope', '$routeParams', 'favoritesService', 'spotifyAPIService', function($scope, $routeParams, favoritesService, spotifyAPIService) {
	$scope.type = "favorites";
	var id, data; 

	if ($routeParams.which == 'album') {
		$scope.rows = favoritesService.getTracksByAlbumId($routeParams.id);
		$scope.name = $scope.rows[0].track.album.name;
		$scope.imageUrl = $scope.rows[0].track.album.images[1].url;
	} else {
		$scope.rows = favoritesService.getTracksByArtistId($routeParams.id);
		$scope.name = $scope.rows[0].track.artists[0].name;

		id = $scope.rows[0].track.artists[0].id;
		data = spotifyAPIService.get({id:id}, function(resp) {
			$scope.imageUrl = resp.images[0].url;
	    });
	}

}]);

'use strict';

angular.module('appControllers').controller('favoritesFilteredCtrl', ['$scope', '$location', '$routeParams', 'favoritesService', 'spotifyAPIService', function($scope, $location, $routeParams, favoritesService, spotifyAPIService) {
	$scope.type = "favorites";
	var data, id, arr; 

	$scope.filterId = $routeParams.filterId;
	$scope.which = ($scope.filterId == 'artists');

	if ($scope.which === true) {
		$scope.artists = favoritesService.getArtists();
	} else {
		$scope.albums = favoritesService.getAlbums();
	}

	$scope.getArtist = function(id) {
		$location.path('/view_tracksby/artist/' + id);
	};

	$scope.getAlbum = function(id) {
		$location.path('/view_tracksby/album/' + id);
	};
	
}]);
'use strict';

angular.module('appControllers').controller('mainCtrl', ['$scope', 'resourceService', 'favoritesService', function($scope, resourceService, favoritesService) {
	
	$scope.configData = resourceService.get({jsonName: 'config'}, function(data) {
		$scope.username = $scope.configData.username; 
		favoritesService.broadcast('applicationConfigLoaded', $scope.configData);
    });

}]);
'use strict';

angular.module('appControllers').controller('playlistSongsCtrl', ['$scope', '$routeParams', 'resourceService', function($scope, $routeParams, resourceService) {
	$scope.type = "playlist";

	$scope.data = resourceService.get({jsonName: $routeParams.playlistId}, function(song) {
		$scope.rows = $scope.data.items;
    });

}]);
'use strict';

angular.module('appControllers').controller('songsCtrl', ['$scope', 'favoritesService', function($scope, favoritesService) {
	$scope.type = "favorites";
	$scope.rows = favoritesService.getFavorites();

}]);
'use strict';

angular.module('appDirectives').directive('mediaControlsControl', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/MediaControlsTemplate.html',
		controller: ['$scope', 'queueService', function($scope, queueService) {

			$scope.currentSong = 'whateva';
			var audioSource = $("#srcFile"); 
			var audioPlayer = document.getElementById("audioElement");

			$scope.$on('handlePlayBroadcast', function(event, song) {
				console.dir(song.track.preview_url);
				$scope.currentSong = song.track.preview_url;
				audioSource.attr("src", $scope.currentSong);
				audioPlayer.load();
				audioPlayer.play();
			});
		
		}]
	};
});
angular.module('appDirectives').directive('nowPlayingControl', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/NowPlayingTemplate.html',
		controller: ['$scope', function($scope) {
			$scope.currentSong = 'Song Title';
			$scope.currentArtist = 'Artist Name';
			$scope.currentAlbumImage = 'images/img_sample_album.png';

			$scope.$on('handlePlayBroadcast', function(event, song) {
				$scope.currentSong = song.track.name;
				$scope.currentArtist = song.track.artists[0].name;
				$scope.currentAlbumImage = song.track.album.images[0].url;
			});
		}]
	};
});

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
'use strict';

angular.module('appDirectives').directive('tableViewControl', function() {

	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'templates/TableViewTemplate.html',
		controller: ['$scope', 'favoritesService', function($scope, favoritesService) {
			$scope.type = $scope.$parent.type;

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

			/*
			$scope.hover = function(index) {
				$("#btn_play_r" + index).css("opacity", 1);
				$("#btn_add_r" + index).css("opacity", 1);
			};

			$scope.hoverOut = function(index) {
				$("#btn_play_r" + index).css("opacity", 0);
				$("#btn_add_r" + index).css("opacity", 0);
			};
			*/
		}]
	};

});


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
'use strict';

angular.module('appServices').service('favoritesService', ['$rootScope', function($rootScope) {

	//var favoritesArray = JSON.parse(localStorage.favorites) || [];
    var favoritesArray = [];

	this.addToFavorites = function(song) {
		favoritesArray.push(song);

        //localStorage.favorites = JSON.stringify(favoritesArray);
	};

	this.removeFromFavorites = function(index) {
		favoritesArray.splice(index, 1);

        //localStorage.favorites = JSON.stringify(favoritesArray);
	};

	this.getFavorites = function() {
		return favoritesArray;
	};

	this.broadcast = function(evt, msg) {
        $rootScope.$broadcast(evt, msg); 
    };

    this.getAlbums = function() {
    	
    	var allAlbums = _.map(favoritesArray, function(song) {
    		return {name:song.track.album.name, image:song.track.album.images[0].url, id:song.track.album.id};
    	});
	
    	return _.uniqBy(allAlbums, 'name');

    };

    this.getArtists = function() {
        
        var allArtists = _.map(favoritesArray, function(song) {
            return {name:song.track.artists[0].name, image:song.track.album.images[0].url, id:song.track.artists[0].id};
        });
    
        return _.uniqBy(allArtists, 'name');

    };

    this.getTracksByAlbumId = function(albumId) {
        
        return _.filter(favoritesArray, function(song) {
            return (song.track.album.id == albumId);
        });

    };

    this.getTracksByArtistId = function(artistId) {
        
        return _.filter(favoritesArray, function(song) {
            return (song.track.artists[0].id == artistId);
        });

    };

}]);
'use strict';

angular.module('appServices').service('queueService', ['$rootScope', function($rootScope) {

	var queueArray = [];
	var currentSongURL = '';


	this.addToQueue = function(arr) {
		queueArray = arr;
	};

	this.clearQueue = function() {
		queueArray = null;
	};

	this.getQueueList = function() {
		return queueArray;
	};

}]);
'use strict';

angular.module('appServices').factory('resourceService', ['$resource', function($resource) {

	return $resource('data/:jsonName.json', {}, {
		query: {method:'GET', params:{jsonName:'config'}, isArray:false}
	});

}]);
'use strict';

angular.module('appServices').factory('spotifyAPIService', ['$resource', function($resource) {

	return $resource('https://api.spotify.com/v1/artists/:id');

}]);