define(["dependencies", "q"], function(_$_, Q) {

	function getLibrary(userAuthData) {
      $.ajax({
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" +userAuthData+"/.json"
      	}).done(function(stuff) {
          console.log("stuff", stuff);

          	//Currently takes all of a users movies and displays them using the template
			require(['hbs!../templates/each_my_movies'], function(getMyMoviesTemplate) {
	          $("#results").html(getMyMoviesTemplate(stuff));
	          $(".rating").rating();
	        });
		});
    } //End getLibrary function

	return {
		getLibrary: getLibrary
	};
});