define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");

  function watchMovie(movieKey, userAuth) {
    var defferedPatch = Q.defer();

    console.log("YOU ARE IN THE DELETEPROMISE MODULE");
	  console.log("this is the movieKey", movieKey);
    console.log("this is the userAuth", userAuth);

    var watch = {
      "watched": true 
    };

    $.ajax({
		  url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+userAuth+"/" + movieKey + "/.json",
		  method: "PATCH",
      data: JSON.stringify(watch)
		})
    .done(function(thing) {
      console.log("Yay, it patched?", thing);
      defferedPatch.resolve(thing); //Do I need to pass anything into this? Do I need it at all?
    })
    .fail(function(xhr, status, error) {
      defferedPatch.reject(error); //Promise Rejection if call failed
    });

    return defferedPatch.promise;
  }

  return watchMovie; //return statement for the file

});