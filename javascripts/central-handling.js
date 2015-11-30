define(function(require) { 
  var _$_ = require("dependencies");
  var authCall = require("authcall");
  var createUserInPrivateFirebase = require("create-user-in-private-firebase");
  var Q = require("q");
  var loadSearch = require("loadSearch");
  var usersLibrary = require("user-library");
  var deleteMovie = require("delete-movie");
  var movieChange = require("movie-change");
  var userSignUp = require("user-sign-up");
  var loginUniqueUser = require("login");
  var searchMyMovies = require("searchmymovies");
  var addModal = require("add-modal");
  var eachMyMoviesTemplate = require("hbs!../templates/each_my_movies");
  var eachMovieTemplate = require("hbs!../templates/each_movie");
    
    $(".page").hide(); // on page load, everything is hidden

    $("#entry-screen").show(); // presents user with login

    var auth;
    var myFirebaseRef = new Firebase("https://forked-movie-history.firebaseio.com/");
    var email, password;
    var signup = false;
    var userSearchValue;
    var allResults = {};
    var userMovieLibrary = {};
    var processedResults;


    // Enters second page when user authenticates
    function changePageOnAuth () {
      $(".main-page").removeAttr("style");
      $("#entry-screen").hide();
      $('#password').val("");
    }

    // Applies handlebar template and stars plugin
    function loadMoviesToPage (library) {
      $("#results").html(eachMyMoviesTemplate(library)); // handlebars template
      $(".rating").rating(); // stars plugin

      $(".error-movie-title").hide();
      $(".movie-add").hide();
      $(".movie-watch").hide();
      $(".stars").hide();
      $(".delete-button").hide();

      // Testing if poster is N/A, and showing movie title instead.
      for (var eachMovie in library) {
        if (library[eachMovie].Poster === "N/A") {
          $(".pull-right[imdb=" + library[eachMovie].imdbID + "]").hide();
          console.log("RAWR", $("#" + library[eachMovie].imdbID + "yo"));
          $("#" + library[eachMovie].imdbID + "yo").show();
        }
      }


      // Processes what 'Watch State' movie is in, and presents user with relevant buttons
      for (var thisMovie in library) {
        if (library[thisMovie].watched === false) {
          $("#" + library[thisMovie].imdbID + ".delete-button").show();
          $("#" + library[thisMovie].imdbID + ".movie-watch").show();
        }
        else if (library[thisMovie].watched === true) {
          $("#" + library[thisMovie].imdbID + ".movie-watch").hide();
          $("#" + library[thisMovie].imdbID + ".delete-button").show();
          $("#" + library[thisMovie].imdbID + ".stars").show();
        }
        else {
          $("#" + library[thisMovie].imdbID + ".movie-add").show();
          $("#" + library[thisMovie].imdbID).addClass('search-result');
        }
      }
    } // Closes function loadMoviesToPage

    function searchUsSomeResults(searchForThis, userMovieLibrary) {

      loadSearch.populateMovies(auth, searchForThis) // returns movieSearchResults

        .then(function(omdbSearchResults) {
          allResults = omdbSearchResults.Search;

          // Loads proper poster with permissions
          // Need If Then Poster
          for (var i = 0; i < allResults.length; i++) {
            if (allResults[i].Poster !== "N/A") {
              allResults[i].Poster = "http://img.omdbapi.com/?i=" + allResults[i].imdbID + "&apikey=8513e0a1";
            }
          }

          processedResults = searchMyMovies(searchForThis, userMovieLibrary, allResults);
          loadMoviesToPage(processedResults);

        })
        .fail(function(error) {
          console.log("error", error);
      });
    } // END SEARCH OMDB FUNCTION

    // Puts results to DOM, according to which user loads
    function beginWebApplication(thisUserAuth, email, password) {

      var fireurl = "https://forked-movie-history.firebaseio.com/all-users-libraries/user_library_" + thisUserAuth +"/";
      var firebaseConnection = new Firebase(fireurl);
      firebaseConnection.on("value", function(snapshot) {
        userMovieLibrary = snapshot.val();


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

    $('body').on('click', '.myposter', function(event) {
      var movieKey = event.target.getAttribute('key');
      var movieID = event.target.getAttribute('imdb');
      if (processedResults) {
        var searchMovieKey = processedResults[movieKey];
        addModal(auth, searchMovieKey.imdbID);
      } else {
        addModal(auth, movieID);
      }
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
          searchUsSomeResults(userSearchValue, userMovieLibrary);
        } // closes else

      } // closes if user hits enter
    }); // closes keyup
 
  $("#search-my-movie-library").on("click", function(){
    searchMyMovies(auth); // potentially need userlibrary and title collected on click

  }); // closes click function of search my movies

  //////// Movie State Changes ///////

  // Add Movie
  $(document).on("click", ".movie-add", function(e){
    loadSearch.clickToAdd(e);
  });

  // Delete Movie
  $(document).on("click", ".delete-button", function(e){
    var movieKey = e.target.getAttribute('title');
    deleteMovie(movieKey, auth);
  });



  // Watch Movie
  $(document).on("click", ".movie-watch", function(e){
    console.log("You clicked the watch button");
    var movieKey = e.target.getAttribute('title');
    movieChange.watchMovie(movieKey, auth);
  });


  // Rate Movie
  $(document).on('rating.change', function(event, starValue) {
    console.log(starValue);
    var starKey = event.target.getAttribute('title');
    movieChange.rateMovie(starKey, auth, starValue);
  });


  // /////// Page Turning on user filtering. ///////

  // See All Movies
  $(document).on("click", ".clickAll", function(e){
    userSearchValue = "";
    processedResults = null;
    $("#all-user-title").show();
    beginWebApplication(auth, email, password);
  });

  // See Watched Movies
  $(document).on("click", ".clickWatch", function(e){
    userSearchValue = "";
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").hide();
    $("#all-user-title").hide();
    $(".search-result").parent().hide();
    // beginWebApplication(auth, email, password);
  });

//////// Good ////////
  // See Unwatched Movies
  $(document).on("click", ".clickUnwatch", function(e){
    console.log("You clicked the UNWATCHED button at top");
    userSearchValue = "";
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").show();
    $("#all-user-title").hide();
    $(".search-result").parent().hide();
    // beginWebApplication(auth, email, password);

  });

  // See Favorited Movies
  $(document).on("click", ".clickFave", function(e){
    console.log("You clicked the Fave button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").hide();
    $("div[fave='5']").show();
    $("#all-user-title").hide();
    $(".search-result").parent().hide();
    // beginWebApplication(auth, email, password);

  });







});// Close page