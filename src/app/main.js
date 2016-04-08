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



