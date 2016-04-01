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

juke.controller('SinglePlaylistCtrl', function ($http,$scope, $stateParams, PlaylistFactory, SongFactory, PlayerFactory) {
	PlaylistFactory.fetchById($stateParams.playlistId).then(function(data) {
		$scope.playlist = data;
		$scope.playlist.songs = $scope.playlist.songs.map(SongFactory.convert);
		return data;
	}) 
	.then(function(data) {
		return SongFactory.getAllSongs();
	})	
	.then(function(allSongs) { 
		$scope.allSongs = allSongs.map(SongFactory.convert);
	});

	$scope.submit = function(songChoice) {
		PlaylistFactory.addSong($scope.playlist, songChoice)
		.then(function(data) {
			//$scope.playlist.songs.push(SongFactory.convert(data));
			$scope.songChoice = '';
		});
	}
	$scope.remove = function(song) {
		PlaylistFactory.removeSong($scope.playlist, song)
		.then(function(data) {
			console.log("BEFOREEE", $scope.playlist.songs);
			// for (var i = 0; i < $scope.playlist.songs.length; i++) {
			// 	if (song._id === $scope.playlist.songs[i]._id) {
			// 	$scope.playlist.songs.splice(i,1);
			// 	}
			// }
		});
	}

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

});

