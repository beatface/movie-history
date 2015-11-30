define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  function deleteMovie(movieKey, userAuth) {

    $.ajax({
		  url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
		  method: "DELETE"
		})
    .done();

  }

  return deleteMovie; //return statement for the file

});