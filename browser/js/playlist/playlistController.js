'use strict';

juke.controller('PlaylistCtrl', function ($scope, $state,PlaylistFactory) {
	$scope.submit = function(playlistInput) {
		PlaylistFactory.create({name: playlistInput}).then(function(data) {
			$scope.playlistInput = "";
			$state.go('showPlaylist', {playlistId : data._id});
		});
	}

	PlaylistFactory.fetchAll().then(function(data) {
		$scope.playlists = data;
	});
});

juke.controller('SinglePlaylistCtrl', function ($http,$scope, $stateParams, PlaylistFactory, SongFactory) {
	PlaylistFactory.fetchById($stateParams.playlistId).then(function(data) {
		$scope.playlist = data;
		console.log($scope.playlist);
		return data;
	}) 
	.then(function(data) {
		return SongFactory.getAllSongs();
	})	
	.then(function(allSongs) {
		$scope.allSongs = allSongs;
	});

	$scope.submit = function(songChoice) {
		PlaylistFactory.addSong($scope.playlist, songChoice)
		.then(function(data) {
			$scope.playlist.songs.push(data);
			console.log(data);
			$scope.songChoice = '';
		});
	}
});

