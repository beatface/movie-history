define(["dependencies", "authcall", "return-users", "createuser", "q"], 
  function(_$_, authCall, returnusers, createuser, Q) {

return {
    findMovie: function() {
      var ref = new Firebase("https://ama-moviehistory.firebaseio.com/");
      var title = $("#titleInput").val();
      console.log(title);
      $.ajax({
        url: "http://www.omdbapi.com/?t=" + title
      }).done(function(movieData) {
        ref.push({
          "title": movieData.Title,
          "year": movieData.Year,
          "actors": movieData.Actors,
          "seen": false,
          "imdb": movieData.imdbID,
          "poster": "http://img.omdbapi.com/?i=" + movieData.imdbID + "&apikey=8513e0a1"
        });
        $("#titleInput").val("");
      });
    }
  };

});