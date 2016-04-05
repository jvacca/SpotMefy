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