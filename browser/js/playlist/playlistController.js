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
	$scope.remove = function(song) {
		PlaylistFactory.removeSong($scope.playlist, song)
		.then(function(data) {
			console.log("BEFOREEE", $scope.playlist.songs);
			for (var i = 0; i < scope.playlist.songs.length; i++) {
				if (song._id === $scope.playlist.songs[i]._id) {
				$scope.playlist.songs.splice(i,1);
				}
			}
			console.log("after", $scope.playlist.songs);
		});
	}
});

