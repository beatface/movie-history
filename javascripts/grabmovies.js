define(["dependencies", "authcall", "return-users", "createuser", "q"], 
  function(_$_, authCall, returnusers, createuser, Q) {

return {
    findMovie: function() {
      var ref = new Firebase("https://ama-moviehistory.firebaseio.com/MovieLibrary");
      //grabs title value from modal
      var title = $("#titleInput").val();
      console.log(title);
      $.ajax({ //grabs omdb api with title value
        url: "http://www.omdbapi.com/?t=" + title
      }).done(function(movieData) {
        console.log("moviedata", movieData);
        ref.push({ //pushes picked moviedata from omdapi into firebase
          "title": movieData.Title,
          "year": movieData.Year,
          "actors": movieData.Actors,
          "seen": false,
          "imdb": movieData.imdbID,
          "poster": "http://img.omdbapi.com/?i=" + movieData.imdbID + "&apikey=8513e0a1"
        });
        $("#titleInput").val(""); //leaves input empty
      });
    }
  };


});