define(["dependencies", "q"], function(_$_, Q) {

	function getLibrary(userAuthData) {
      $.ajax({
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userAuthData +"/.json"
      	}).done(function(userLibrary) {
          console.log("userLibrary", userLibrary);

          	//Currently takes all of a users movies and displays them using the template
			require(['hbs!../templates/each_my_movies'], function(getMyMoviesTemplate) {
	          $("#results").html(getMyMoviesTemplate(userLibrary));
	          $(".rating").rating();
	        });
		});
    } //End getLibrary function

	return {
		getLibrary: getLibrary
	};
});