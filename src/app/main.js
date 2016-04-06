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
