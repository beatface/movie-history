define(["dependencies", "q"], function(_$_, Q) {

	function getLibrary(userAuthData) {
      $.ajax({
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" +userAuthData+"/.json"
      	}).done(function(stuff) {
          console.log("stuff", stuff);
   //        var playlist2 = Object.keys(song.songs).map( function(key){
   //          var y = song.songs[key];
   //          y.key = key;
   //          return y;
   //        });

			// $("#song-info").append(Handlebars(playlist2));
			// executeMe.executeMe(playlist2);

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