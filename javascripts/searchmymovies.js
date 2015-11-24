define(function(require) { 
  var usersLibrary = require("user-library");
  var _$_ = require("dependencies");

  function processSearchResults(searchValue, userMovieLibrary) {
    var lowercaseSearchValue = searchValue.toLowerCase();
    var searchResults = {};

    for (var thisMovie in userMovieLibrary) {
      console.log("thisMovie");
      var lowercaseMovie = userMovieLibrary[thisMovie].Title.toLowerCase();
      if (lowercaseMovie.indexOf(lowercaseSearchValue) > 0) {
        searchResults[thisMovie] = userMovieLibrary[thisMovie];
      }
    } // closes outer for loop

    console.log("searchResults", searchResults);
  } // closes processSearchResults

  function searchMyMovies(passedAuth, userSearchInput) {
    console.log("searchMyMovies triggered");
    
    usersLibrary(passedAuth) // collects promise from user-library.js
      .then(function(userUniqueLibrary) {
        processSearchResults(userSearchInput, userUniqueLibrary);
      })
      .fail(function(error) {
        console.log("error", error);
      });

  } // closes searchMyMovies function
 // hmm page incomplete...
  





        // if (userSearchInput === ""){
        //   usersLibrary.getLibrary(passedAuth);
        // } else {
        //   require(['hbs!../templates/each_my_movies'], 
        //     function(getMyMoviesTemplate) {
        //     for (var movie in allmovies) {
        //       if (allmovies[movie].Title === userSearchInput) {
        //         $("#results").html(getMyMoviesTemplate({"thing":allmovies[movie]}));
        //       }
        //     }
        //   }); // :)Closes the AREquire function
          
        // } //closes else












  return searchMyMovies;
  

});
