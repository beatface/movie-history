define(function(require) { 
  var usersLibrary = require("user-library");
  var _$_ = require("dependencies");

  function searchMyMovies(thisUserAuth) {

    var userSearchInput = $(".search-all-movies").val();
    
    $.ajax({
        url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + thisUserAuth + "/.json"
        }).done(function(allmovies) {
        if (userSearchInput === ""){
          usersLibrary.getLibrary(thisUserAuth);
        } else {
          require(['hbs!../templates/each_my_movies'], 
            function(getMyMoviesTemplate) {
            for (var movie in allmovies) {
              if (allmovies[movie].Title === userSearchInput) {
                $("#results").html(getMyMoviesTemplate({"thing":allmovies[movie]}));
              }
            }
          }); // :)Closes the AREquire function
          
        } //closes else
    }); // closes .done statement

  } // closes searchMyMovies function

  return searchMyMovies;
  

});
