import './styles.scss'

$(document).ready(function(){
  $("#artistSearchBtn").click(function(){
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
        for(var i = 0; i < 29; i++) {
          $("#songList").show();
          $(`#songList`).append(`<p id="songName${i}">${trackList[i].track.track_name} <button class="btn" id="favoriteBtn${i}"><i class="fa fa-star status"></i></button></p>`);
          let songId = trackList[i].track.track_name
          let songTitle = trackList[i].track.track_name
          let songArtist = trackList[i].track.artist_name
          let songGenre = trackList[i].track.track_name
          let songRating = trackList[i].track.track_name
          $(`#favoriteBtn${i}`).click(function(){
            event.preventDefault();
            window.alert(`You have favorited ${songTitle} by ${songArtist}!`)
          })
        }
      },
    });
  })
});
