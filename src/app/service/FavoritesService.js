'use strict';

angular.module('appServices').service('favoritesService', ['$rootScope', function($rootScope) {

	var favoritesArray = JSON.parse(localStorage.favorites) || [];

	this.addToFavorites = function(song) {
		favoritesArray.push(song);

        localStorage.favorites = JSON.stringify(favoritesArray);
	};

	this.removeFromFavorites = function(index) {
		favoritesArray.slice(index, 1);
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
            return {name:song.track.artists[0].name, id:song.track.artists[0].id};
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