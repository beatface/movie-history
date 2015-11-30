define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  function rateMovie(movieKey, userAuth, stars) {

    var newRating = {
      "rating": stars
    };

    $.ajax({
      url: "https://forked-movie-history.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
      method: "PATCH",
      data: JSON.stringify(newRating)
    })
    .done(function(info) {
      console.log("AJAX newRating patch", info);
    });

  }

  function watchMovie(movieKey, userAuth) {

    var watch = {
      "watched": true 
    };

    $.ajax({
		  url: "https://forked-movie-history.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
		  method: "PATCH",
      data: JSON.stringify(watch)
		})
    .done(function(info) {
      console.log("AJAX watched patch", info);
    });

  }

  return {
    watchMovie: watchMovie,
    rateMovie: rateMovie
  }; //return statement for the file

});