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


  playlist.fetchById = function(id) {
    return $http.get('/api/playlists/' + id)
    .then(function(response) {
      return response.data;
    });
  }

  playlist.addSong = function(playlist, song) {
    return $http.post('/api/playlists/' + playlist._id + '/songs', {song:song})
    .then(function(response) {
      return response.data;
    });
  }
  return playlist;
});