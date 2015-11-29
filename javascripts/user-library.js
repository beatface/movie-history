define(["dependencies", "q"], function(_$_, Q) {

	function getLibrary(userAuthData) {

	  var deferred = Q.defer();

      $.ajax({
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userAuthData +"/.json"
      	})
      .done(function(userLibrary) {
        console.log("ajax getLibrary GET", userLibrary);
        deferred.resolve(userLibrary);
      })
      .fail(function(error) {
      	deferred.reject(error);
      });

      return deferred.promise;

    } //End getLibrary function

	return getLibrary;
});