define(["dependencies", "stars"], 
  function(_$_, stars) {

     return {

        populateMovies: function() { 

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
            });
        }
      };
    });