define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  function deleteMovie(movieKey, userAuth) {
    var defferedDelete = Q.defer();

    console.log("YOU ARE IN THE DELETEPROMISE MODULE");
	  console.log("this is the movieKey", movieKey);
    console.log("this is the userAuth", userAuth);

    $.ajax({
		  url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
		  method: "DELETE"
		})
    .done(function(deltedItem) {
      console.log("Yay, it deleted!");
      defferedDelete.resolve(deltedItem); //Do I need to pass anything into this? Do I need it at all?
    })
    .fail(function(xhr, status, error) {
      defferedDelete.reject(error); //Promise Rejection if call failed
    });

    return defferedDelete.promise;
  }

  return deleteMovie; //return statement for the file

});