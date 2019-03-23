import './styles.scss'

$(document).ready(function(){
  $("#artistSearchBtn").click(function(){
    event.preventDefault();
    event.stopPropagation();
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
        for(var i = 0; i < 29; i++) {
          $("#songList").show();
          $(`#songList`).append(`<p id="songName${i}">${trackList[i].track.track_name} <button class="btn" id="favoriteBtn${i}"><i class="fa fa-star status"></i></button></p>`);
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
              contentType: 'application/json',
              sucess: function(data){
                console.log("working")
              },
              error: function(data){
                console.log(data);
              }
            })
          });
        }
      },
    });
  })
});
