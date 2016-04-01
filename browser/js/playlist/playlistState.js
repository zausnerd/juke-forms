'use strict';

juke.config(function ($stateProvider) {
  $stateProvider.state('playlist', {
    url: '/playlist',
    templateUrl: '/js/playlist/playlist.html',
    controller: 'PlaylistCtrl'
  }),
  $stateProvider.state('showPlaylist', {
    url: '/playlists/:playlistId',
    templateUrl: '/js/playlist/showPlaylist.html',
    controller: 'SinglePlaylistCtrl'
  })
});

