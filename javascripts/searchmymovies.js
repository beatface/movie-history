define(function(require) { 
  var usersLibrary = require("user-library");
  var _$_ = require("dependencies");

  function processSearchResults(searchValue, userMovieLibrary) {
    
    var searchResults = {};
    var lowercaseSearchValue = searchValue.toLowerCase();

    for (var thisMovie in userMovieLibrary) {
      var lowercaseMovie = userMovieLibrary[thisMovie].Title.toLowerCase();
      if (lowercaseMovie.indexOf(lowercaseSearchValue) > -1) {
        searchResults[thisMovie] = userMovieLibrary[thisMovie];
      }
    } // closes for loop
    
    return searchResults;


  } // closes function processSearchResults

  return processSearchResults;
  
});