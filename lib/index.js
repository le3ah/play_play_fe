import './styles.scss'

$(document).ready(function(){
  $("#artistSearchBtn").click(function(){
    event.preventDefault();
    var artistName = $("#artistName").val();
    $.ajax({
      url: `https://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&apikey=f79ce08e6df5e9e6286edb9802eb6583`,
      type: 'GET',
      data: {
        format: 'jsonp',
        callback: 'jsonp_callback'
      },
      dataType: 'jsonp',
      jsonpCallback: 'jsonp_callback',
      success: function(data, status){
        let trackList = data["message"]["body"]["track_list"]
        trackList.forEach(track => {
          debugger;
          addSongs(track);
        })
      },
    });
  })
});
function addSongs(track){
  $("#songList").html(`<p>${track.track.track_name}</p>`)
}
data["message"]["body"]["track_list"][1]["track"]["track_name"]
