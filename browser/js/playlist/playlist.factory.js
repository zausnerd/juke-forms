'use strict';

juke.factory('PlaylistFactory', function ($http, $q) {
  var playlist = {};
  var cachedPlayList  = [];

  playlist.create = function(playlistData) {
    return $http.post('/api/playlists', playlistData)
    .then(function(response) {
      cachedPlayList.push(response.data);
      return response.data;
    });
  };

  playlist.fetchAll = function() {
    return $http.get('/api/playlists')
    .then(function(response) {
      angular.copy(response.data, cachedPlayList);
      return cachedPlayList;
    });
  }

  var cachedSinglePlaylist  = {};

  playlist.fetchById = function(id) {
    return $http.get('/api/playlists/' + id)
    .then(function(response) {
      angular.copy(response.data, cachedSinglePlaylist)
      return cachedSinglePlaylist;
    });
  }

  playlist.addSong = function(playlist, song) {
    return $http.post('/api/playlists/' + playlist._id + '/songs', {song:song})
    .then(function(response) {
      cachedSinglePlaylist.songs.push(response.data);
      return response.data;
    });
  }

  playlist.removeSong = function(playlist, song) {
    return $http.delete('/api/playlists/' + playlist._id + '/songs/' + song._id)
    .then(function(response) {
        for (var i = 0; i <  cachedSinglePlaylist.songs.length; i++) {
            if (song._id === cachedSinglePlaylist.songs[i]._id) {
              cachedSinglePlaylist.songs.splice(i,1);
            }
        }
      return response.data;
    });
  }

  return playlist;
});