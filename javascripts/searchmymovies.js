define(function(require) { 
  var usersLibrary = require("user-library");
  var _$_ = require("dependencies");

  function reconcileLibraries (preferenceLibrary, secondaryLibraryCollection) {

    secondaryLibraryCollection.forEach(function(movieObj) {
      if (!preferenceLibrary[movieObj.Title]) {
        preferenceLibrary[movieObj.Title] = movieObj;
      }

    });
    return preferenceLibrary;



  }



  function processSearchResults(searchValue, userMovieLibrary, omdbLibraryMatchingSearch) {
    
    var conflatedLibraries = {};
    var userMatchingSearch = {};
    var lowercaseSearchValue = searchValue.toLowerCase();

    // Finds all movies in user's saved library that match search in navbar
    for (var thisMovie in userMovieLibrary) {
      var lowercaseMovie = userMovieLibrary[thisMovie].Title.toLowerCase();
      if (lowercaseMovie.indexOf(lowercaseSearchValue) > -1) {
        userMatchingSearch[thisMovie] = userMovieLibrary[thisMovie];
      }
    } // closes for loop


    console.log("userMatchingSearch", userMatchingSearch);
    console.log("omdbLibraryMatchingSearch", omdbLibraryMatchingSearch);

    return reconcileLibraries(userMatchingSearch, omdbLibraryMatchingSearch);

  } // closes function processSearchResults

  return processSearchResults;
  
});