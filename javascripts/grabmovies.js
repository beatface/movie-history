define(["dependencies", "authcall", "return-users", "createuser", "q"], 
  function(_$_, authCall, returnusers, createuser, Q) {

return {
    findMovie: function(moviedata, chosenmovieposter, userID) {
      var thisUserLibrary = new Firebase("https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + userID);
      //grabs title value from modal
      console.log("moviedata", moviedata);
      console.log("chosenmovieposter", chosenmovieposter);
      var userMovieInLibrary = thisUserLibrary.child(moviedata.Title + "_" + moviedata.Year);
      userMovieInLibrary.set({
        "omdb_data": moviedata,
        "watched": false, // boolean
        "rating": 0 // user will rate 1 to 5
      });
        
    }
  };


});