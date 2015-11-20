define(["dependencies", "stars", "grabmovies"], 
  function(_$_, stars, grabmovies) {

     return {

        populateMovies: function(authInfo) { 

          var title = $("#titleInput").val();
          console.log("title", title);
          $.ajax({ //grabs omdb api with title value
              url: "http://www.omdbapi.com/?t=" + title
            }).done(function(movieData) {
                console.log("moviedata", movieData);
                var moviesArray = 
                  {
                    poster: "http://img.omdbapi.com/?i=" + movieData.imdbID + "&apikey=8513e0a1"
                  };
                

              require(['hbs!../templates/each_movie'], function(getMovieTemplate){
                $('#basic').html(getMovieTemplate(moviesArray));
                $(".rating").rating();
              });

              $(document).on("click", ".movie-add", function(e) {
                console.log("You clicked add movie");
                grabmovies.findMovie(movieData, moviesArray.poster, authInfo);

              });

              $("#titleInput").val(""); //leaves input empty



            });
        }
      };
    });