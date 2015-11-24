define(function(require) { 
  var usersLibrary = require("user-library");
  var _$_ = require("dependencies");

  function processSearchResults(searchValue, userMovieLibrary) {
    var lowercaseSearchValue = searchValue.toLowerCase();
    var searchResults = {};

    for (var thisMovie in userMovieLibrary) {
      // console.log("thisMovie", userMovieLibrary[thisMovie]);
      var lowercaseMovie = userMovieLibrary[thisMovie].Title.toLowerCase();
      if (lowercaseMovie.indexOf(lowercaseSearchValue) > -1) {
        searchResults[thisMovie] = userMovieLibrary[thisMovie];
      }
    } // closes outer for loop

    return searchResults;
  } // closes processSearchResults

  return processSearchResults;
  

});
