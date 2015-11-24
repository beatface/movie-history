define(["dependencies", "authcall", "return-users", "create-user-in-private-firebase", "q"], 
  function(_$_, authCall, returnusers, createUserInPrivateFirebase, Q) {

return {
    findMovie: function(moviedata, userID) {
      var thisUserLibrary = new Firebase("https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userID);
      //grabs title value from modal
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title);
      moviedata.rating = 0;
      moviedata.watched = false;

      userMovieInLibrary.set(moviedata);
      }
        
    };
});