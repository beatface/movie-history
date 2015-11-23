define(["dependencies", "authcall", "return-users", "createuser", "q"], 
  function(_$_, authCall, returnusers, createuser, Q) {

return {
    findMovie: function(moviedata, userID) {
      var thisUserLibrary = new Firebase("https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userID);
      //grabs title value from modal
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title + "_" + moviedata.Year);
      userMovieInLibrary.set({
        "title": moviedata.Title,
        "omdb_data": moviedata,
        "watched": false, // boolean
        "rating": 0 // user will rate 1 to 5
      });
        
    }
  };


});