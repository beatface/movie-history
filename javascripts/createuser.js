define(["dependencies", "q"], function(_$_, Q) {

	return {
		createTheUser: function(emailIt, passwordIt, ref) {

			var deferred = Q.defer();

			ref.createUser({
			  email    : emailIt,
			  password : passwordIt
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			  }
			});
	    return deferred.promise;
		}
	};

});