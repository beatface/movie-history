define(["dependencies", "authcall", "create-user-in-private-firebase", "q"], 
  function(_$_, authCall, createUserInPrivateFirebase, Q) {

return {
    findMovie: function(moviedata, userID) {
      var thisUserLibrary = new Firebase("https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userID);
      console.log("creating Firebase direct link?");
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title);
      moviedata.rating = 0;
      moviedata.watched = false;

      userMovieInLibrary.set(moviedata);
      }
        
    };
});