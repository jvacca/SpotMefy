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