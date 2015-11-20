define(["dependencies", "q"], function(_$_, Q) {

	function createTheUser(emailIt, passwordIt, ref) {

		var deferred = Q.defer();

		ref.createUser({
			  email    : emailIt,
			  password : passwordIt
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			    deferred.reject(error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    deferred.resolve(userData);
			  }
			});
	    return deferred.promise;
	} //End creatheuser function

	return createTheUser;
});