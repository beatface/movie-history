define(["dependencies", "authcall", "return-users", "createuser", "q"], 
  function(_$_, authCall, returnusers, createuser, Q) {

return {
    findMovie: function(moviedata, chosenmovieposter, userID) {
      var ref = new Firebase("https://ama-moviehistory.firebaseio.com/MovieLibrary/" + userID);
      //grabs title value from modal
      console.log("moviedata", moviedata);
      console.log("chosenmovieposter", chosenmovieposter);
      userMovieInLibrary = {moviedata: moviedata};
      userMovieInLibrary.watched = false; //boolean
      userMovieInLibrary.rating = 0; // when user changes, stores 1 - 5 rating

      console.log("userMovieInLibrary", userMovieInLibrary);
      ref.push({ userMovieInLibrary: userMovieInLibrary});
      // Need to work on structure of object next!
        
    }
  };


});