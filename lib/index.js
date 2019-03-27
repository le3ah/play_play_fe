import './styles.scss'

$(document).ready(function(){
  displayFavorites();
  $('')
  displayPlaylists();
  $("#artistSearchBtn").on('click', function(){
    event.preventDefault();
    var artistName = $("#artistName").val();
    $.ajax({
      url: `https://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&page_size=30&apikey=f79ce08e6df5e9e6286edb9802eb6583`,
      type: 'GET',
      data: {
        format: 'jsonp',
        callback: 'jsonp_callback'
      },
      dataType: 'jsonp',
      jsonpCallback: 'jsonp_callback',
      success: function(data, status){
        let trackList = data["message"]["body"]["track_list"]
        $(`#songList`).text("")
        $('#songList').append(`<h2>Rockin' Results</h2>`)
        for(var i = 0; i < 29; i++) {
          $("#songList").show();
          $('#songList').append(`<p id="songName${i}"><button class="btn" id="favoriteBtn${i}"><i class="fa fa-star status" style='font-size:25px'></i></button> ${trackList[i].track.track_name}</p>`);
          let songTitle = trackList[i].track.track_name
          let songArtist = trackList[i].track.artist_name
          let songGenre = trackList[i].track.primary_genres.music_genre_list[0] ? trackList[i].track.primary_genres.music_genre_list[0].music_genre.music_genre_name : "Esoteric"
          let songRating = trackList[i].track.track_rating
          $(`#favoriteBtn${i}`).click(function(){
            event.preventDefault();
            window.alert(`You have favorited ${songTitle} by ${songArtist}!`);
            $.ajax({
              url: "https://protected-fortress-76604.herokuapp.com/api/v1/favorites",
              type: 'POST',
              data:  JSON.stringify({
                "name": songTitle,
                "artist_name": songArtist,
                "genre": songGenre,
                "rating": songRating
              }),
              contentType: 'application/json'
            })
            $('#favoritesList').append(`<p id="songName${i}"><button class="btn" id="playlistBtn${i}"><i class="fas fa-skull-crossbones status" style='font-size:30px'></i></button> <strong>Name: </strong>${songTitle}<br><strong>Artist: </strong>${songArtist}<br><strong>Genre: </strong>${songGenre}<br><strong>Rating: </strong>${songRating}</p>`)
          });
        }
      }
    });
  })
});
const displayFavorites = () => {
  $.get('https://protected-fortress-76604.herokuapp.com/api/v1/favorites', function(data, status) {
    let favorites = data
    $('#favoritesList').text("")
    $('#favoritesList').append(`<h2>Favorite Rockin' Songs</h2>`)
    for(var i = 0; i < 29; i++) {
      $("#favoritesList").show();
      if(data[i]){
        let songId = data[i].id
        let songName = data[i].name
        let songArtistName = data[i].artist_name
        let songGenre = data[i].genre
        let songRating = data[i].rating
        $('#favoritesList').append(`<p id="songName${i}"><button class="btn" id="destroyBtn${i}"><i class="fas fa-skull-crossbones status" style='font-size:30px'></i></button> <strong>Name: </strong>${data[i].name}<br><strong>Artist: </strong>${data[i].artist_name}<br><strong>Genre: </strong>${data[i].genre}<br><strong>Rating: </strong>${data[i].rating}</p>`)
        $(`#destroyBtn${i}`).click(function(){
          $(`#songName${i}`).hide();
          $(`#destroyBtn${i}`).hide();
          event.preventDefault();
          window.alert(`You have removed ${songName} by ${songArtistName}!`);
          $.ajax({
            url: `https://protected-fortress-76604.herokuapp.com/api/v1/favorites/${songId}`,
            type: 'delete',
            sucess: function(data, status) {
              alert(`Success: status code ${status}`);
            },
            error: function(data) {
              console.log('Error:', data);
            }
          })
        });
      }
    }
  })
}
const displayPlaylists = () => {
  $.get('https://protected-fortress-76604.herokuapp.com/api/v1/playlists', function(data, status) {
    let playlists = data
    $('#playlistsList').text("")
    $('#playlistsList').append(`<h2>My Rockin' Playlists</h2> `)
    for(var i = 0; i < 29; i++) {
      $("#playlistsList").show();
      if(data[i]){
        $('#playlistsList').append(`<p id="playlistName${i}"><button class="btn" id="playlistBtn${i}"><i class="fas fa-guitar status" style='font-size:30px'></i></button> ${data[i].playlist_name}</p><p id="songsForPlaylist${i}"></p><br>`)
        $(`#playlistBtn${i}`).click(function(){
          event.preventDefault();
          window.alert(`The songs in your playlist are already displayed, silly! You're welcome! 😎`);
        })
        for(var n= -1; n < 29; n++){
          let songs = data[i]["favorite"]
          if(songs[n]){
            $(`#songsForPlaylist${i}`).append(`<p id="playlistSong${n}"> "${songs[n]["name"]}" by ${songs[n]["artist_name"]}</p>`)
          }
        }
      }
    }
  })
}
