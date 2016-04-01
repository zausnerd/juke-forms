'use strict';

juke.factory('SongFactory', function ($http, $q) {

  return {
    convert: function (song) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      return song;
    },
    getAllSongs : function() {
    	return $http.get('/api/songs').then(function(allSongs) {
    		return allSongs.data;
    	});
    }
  };

});
