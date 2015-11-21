define(["dependencies", "stars", "grabmovies"], 
  function(_$_, stars, grabmovies) {

     return {

        populateMovies: function(authInfo) { 

          var title = $("#titleInput").val();
          $.ajax({ //grabs omdb api with title value
              url: "http://www.omdbapi.com/?s=" + title
            }).done(function(movieData) {

              var allResults = movieData.Search; // Creates ann array of all search results
              var postersForTemplate = {}; // Prepares object to send to hbs template

              // Cycles thru and changes poster so we have permission to print to page
              for (var i = 0; i < allResults.length; i++) {
                allResults[i].Poster = "http://img.omdbapi.com/?i=" + allResults[i].imdbID + "&apikey=8513e0a1";
              }

              postersForTemplate = {"posterListings": allResults}; 

              // Sends array, modified with proper poster w/ api key, to template
              require(['hbs!../templates/each_movie'], function(getMovieTemplate){
                $('#results').html(getMovieTemplate(postersForTemplate));
                $(".rating").rating();
              });

              // Adds data from just this particular movie to user's library of movies, not yet functioning
              $(document).on("click", ".movie-add", function(e) {
                var thisMovieId = e.target.id; // grabs movie in search results from id on add button
                var thisMovieImdbId = allResults[thisMovieId].imdbID; // grabs proper movie information given correct id

                $.ajax({ // Makes the next api request to get full listing on movie, not just search results (which were abbreviated)
                  url: "http://www.omdbapi.com/?i=" + thisMovieImdbId + "&r=json"
                }).done(function(fullMovieListing) {
                  fullMovieListing.Poster = "http://img.omdbapi.com/?i=" + thisMovieImdbId + "&apikey=8513e0a1";
                  console.log("fullMovieListing", fullMovieListing);
                  // Sends full movie listing, with user login ID, to store on website database
                  grabmovies.findMovie(fullMovieListing, authInfo);

                });



              });

              $("#titleInput").val(""); //leaves input empty



            });
        }
      };
    });