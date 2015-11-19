define(["dependencies", "q"], function(_$_, Q) {

	var appUsers;

	return {

		/*jshint esnext: true */

		retrieveUsers: function() {
			var deferred = Q.defer();

			$.ajax({
	            url: "https://ama-moviehistory.firebaseio.com/users.json",
	            method: "GET"
	            // data: JSON.stringify(newUser)
	        })
	        .done(function(users) {

	        	deferred.resolve(users);
	        })
	        .fail(function(error) {
	        	deferred.reject(error);
	        	console.log("FAIL", error);
	        });
	        return deferred.promise;
	    }

	};
});