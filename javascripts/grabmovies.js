define(["dependencies", "authcall", "create-user-in-private-firebase", "q"], 
  function(_$_, authCall, createUserInPrivateFirebase, Q) {

  return {
    findMovie: function(moviedata, userID) {
    	console.log("moviedata", moviedata);
      var thisUserLibrary = new Firebase("https://forked-movie-history.firebaseio.com/all-users-libraries/user_library_" + userID);
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title);
      moviedata.rating = 0;
      moviedata.watched = false;

      userMovieInLibrary.set(moviedata);
    }
        
  };
});