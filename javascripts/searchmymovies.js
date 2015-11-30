define(function(require) { 
  var usersLibrary = require("user-library");
  var _$_ = require("dependencies");

  function reconcileLibraries (preferenceLibrary, secondaryLibraryCollection) {

    secondaryLibraryCollection.forEach(function(movieObj) {
      if (!preferenceLibrary[movieObj.Title]) {
        preferenceLibrary[movieObj.Title] = movieObj;
      }

    });

    var sortedMovielist = Object.keys(preferenceLibrary).map( function( key ){
        var y = preferenceLibrary[ key ];
        y.key = key;
      return y;
     });


    // This looks at the Title in each item of the movieList and sorts alphabetically
      sortedMovielist.sort(function(a, b) {
          if (a.Title > b.Title) {
            return 1;
          }
          if (a.Title < b.Title) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

    return sortedMovielist;

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

    return reconcileLibraries(userMatchingSearch, omdbLibraryMatchingSearch);

  } // closes function processSearchResults

  return processSearchResults;
  
});