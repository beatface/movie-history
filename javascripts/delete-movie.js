define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");
  var firebase = require("firebase");

  function deleteMovie(movieKey, userAuth) {
    var ref = new Firebase("https://forked-movie-history.firebaseio.com/all-users-libraries/user_library_" + userAuth + "/" + movieKey);

    ref.update({
      "deleted" : true
    });

  //   $.ajax({
		//   url: "https://forked-movie-history.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
		//   method: "DELETE"
		// })
  //   .done();
  }

  return deleteMovie; //return statement for the file
});