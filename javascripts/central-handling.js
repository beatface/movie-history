define(["dependencies", "authcall", "create-user-in-private-firebase", "q", "loadSearch", "user-library", "delete-movie", "movie-change", "user-sign-up", "login", "searchmymovies", "add-modal", "hbs!../templates/each_my_movies", "hbs!../templates/each_movie"], 
  function(_$_, authCall, createUserInPrivateFirebase, Q, loadSearch, usersLibrary, deleteMovie, movieChange, userSignUp, loginUniqueUser, searchMyMovies, addModal, eachMyMoviesTemplate, eachMovieTemplate) {
    
    $(".page").hide(); // on page load, everything is hidden

    $("#entry-screen").show(); // presents user with login

    var auth;
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");
    var email, password;
    var signup = false;
    var userSearchValue;
    var allResults = {};
    var userMovieLibrary = {};


    // Enters second page when user authenticates
    function changePageOnAuth () {
      $(".main-page").show();
      $("#entry-screen").hide();
      $('#password').val("");
    }

    // Applies handlebar template and stars plugin
    function loadMoviesToPage (library) {
      $("#results").html(eachMyMoviesTemplate(library)); // handlebars template
      $(".rating").rating(); // stars plugin
    }

    function searchUsSomeResults(searchForThis, userMovieLibrary) {
      console.log("searchUsSomeResults triggered");
      console.log("userMovieLibrary", userMovieLibrary);
      var displayAllMovies = {};
      loadSearch.populateMovies(auth, searchForThis) // returns movieSearchResults

        .then(function(omdbSearchResults) {

          // Crafts posters for display
          allResults = omdbSearchResults.Search; // Creates an array of all search results

          // Cycles thru and changes poster so we have permission to print to page
          for (var i = 0; i < allResults.length; i++) {
            allResults[i].Poster = "http://img.omdbapi.com/?i=" + allResults[i].imdbID + "&apikey=8513e0a1";
          }

          // console.log("userMovieLibrary", userMovieLibrary);

          for (var i = 0; i < allResults.length; i++) {
            displayAllMovies[allResults[i].Title] = allResults[i];
          }

          for (var eachMovie in userMovieLibrary) {
            displayAllMovies[userMovieLibrary[eachMovie].Title] = userMovieLibrary[eachMovie];
          }

          console.log("displayAllMovies", displayAllMovies);

          $("#results").html(eachMyMoviesTemplate(displayAllMovies));
          $(".rating").rating();
          // test against user's library so we don't populate if already in thing...
        })
        .fail(function(error) {
          console.log("error", error);
      });
    } // END SEARCH OMDB FUNCTION

    // Puts results to DOM, according to which user loads
    function beginWebApplication(thisUserAuth, email, password) {

      console.log("something here? creates firebase connection to this user library");
      var fireurl = "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + thisUserAuth +"/";
      var firebaseConnection = new Firebase(fireurl);
      firebaseConnection.on("value", function(snapshot) {
        userMovieLibrary = snapshot.val();
        console.log("userMovieLibrary", userMovieLibrary);


        // On userMovieLibrary state change, carries thru same search term and keeps page populated.
        if (userSearchValue) {
          console.log("if that recognizes search");
          searchUsSomeResults(userSearchValue, userMovieLibrary);
        } else {
          console.log("else that loads page");
          loadMoviesToPage(userMovieLibrary);
        }
      }); //End on Value Function

    } // closes beginWebApplication function
    
    //Start logout function
    $("#logout-button").click(function(e) {
      if (auth) {
        auth = null;
        myFirebaseRef.unauth();
        $("#results").html(""); // cleans out user library
        $(".page").hide(); // turns back to login screen
        $("#entry-screen").show();
      }
    }); //END LOGOUT FUNCTION

    // Creates user and enters into application
    $('#signupButton').on("click", function() {
      email = $('#email').val();
      password = $('#password').val();

      createUserInPrivateFirebase(email, password, myFirebaseRef)
        .then(function(authConfirmNumber) {
          auth = authConfirmNumber.uid;
          changePageOnAuth();
          beginWebApplication(auth, email, password); // sends to main page functionality
        })
        .fail(function(error) {
          console.log(error);
        });
    });// Closes sign up button click



    // User authentication, private process w/ Firebase
    $('#login').on("click", function() {
      email = $('#email').val();
      password = $('#password').val();
      authCall(email, password, myFirebaseRef) 
        // Send email and password for login authentication
        .then(function(authData) {
          auth = authData.uid;
          changePageOnAuth();
          loginUniqueUser(myFirebaseRef, auth, email, password); // checks user against existing ones
          beginWebApplication(auth, email, password); // sends to main page functionality
        })
        .fail(function(error) {
          console.log("error", error);
        }); // closes authCall promise
    }); // Closes Login click function

    // when you click on a poster, addModal file gets called and modal appears with movie info.
    $('body').on('click', '.poster', function(event) {
      loadSearch.addSearchModal(event);
    });

    $('body').on('click', '.myposter', function(event) {
      var movieKey = event.target.getAttribute('key'); 
      addModal(auth, movieKey);
    });

    // Search bar functionality
    var userSearchField = $(".search-all-movies");
    userSearchField.keyup(function(e) {
      if (e.keyCode === 13) {
        $("#all-user-title").hide();
        userSearchValue = userSearchField.val(); // gathers user input in search
        var userSearchResults;

        // If search bar is empty, loads user's movie catalog
        if (userSearchValue === "") {
          alert("Please type in a movie title to search!");
        } 

        // If user entered value into search bar
        else {  
          userSearchField.val("");
          console.log("userMovieLibrary in search", userMovieLibrary);
          searchUsSomeResults(userSearchValue, userMovieLibrary);
        } // closes else

      } // closes if user hits enter
    }); // closes keyup
 
  $("#search-my-movie-library").on("click", function(){
    searchMyMovies(auth); // potentially need userlibrary and title collected on click

  }); // closes click function of search my movies

  // Add Movie
  $(document).on("click", ".movie-add", function(e){
    console.log("You clicked the add button");
    loadSearch.clickToAdd(e);
  });

  //////// Movie State Changes ///////

  // Delete Movie
  $(document).on("click", ".delete-button", function(e){
    console.log("You clicked the delete button");
    var movieKey = e.target.getAttribute('key');
    deleteMovie(movieKey, auth);
  });


  // Watch Movie
  $(document).on("click", ".movie-watch", function(e){
    console.log("You clicked the watch button");
    var movieKey = e.target.getAttribute('key');
    movieChange.watchMovie(movieKey, auth)
    .then(function(){
      // usersLibrary(auth);
    });
  });


  // Rate Movie
  $(document).on('rating.change', function(event, starValue) {
    console.log(starValue);
    var starKey = event.target.id;
    console.log("starKey", starKey);
    movieChange.rateMovie(starKey, auth, starValue)
    .then(function(){
      // usersLibrary(auth);
    });
  });

  /////// Page Turning on user filtering. ///////

  // See All Movies
  $(document).on("click", ".clickAll", function(e){
    console.log("You clicked the All button at top");
    userSearchValue = "";
    usersLibrary(auth)
    .then(function(allUserMovies) {
      loadMoviesToPage(allUserMovies);
      $("#all-user-title").show();
    });
  });

  // See Watched Movies
  $(document).on("click", ".clickWatch", function(e){
    console.log("You clicked the WATCHED button at top");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").hide();
    $("#all-user-title").hide();
    $(".search-result").hide();
  });

  // See Unwatched Movies
  $(document).on("click", ".clickUnwatch", function(e){
    console.log("You clicked the UNWATCHED button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").show();
    $("#all-user-title").hide();
    $(".search-result").hide();
  });

  // See Favorited Movies
  $(document).on("click", ".clickFave", function(e){
    console.log("You clicked the Fave button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").hide();
    $("div[fave='5']").show();
    $("#all-user-title").hide();
    $(".search-result").hide();
  });







});// Close page