define(function(require) { 
  var _$_ = require("dependencies");
  var authCall = require("authcall");
  var returnusers = require("return-users");
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

    $("#entry-screen").show();

    var auth;
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");
    var email, password;
    var signup = false;
    var userSearchValue;

    // Enters second page when user authenticates
    function changePageOnAuth () {
      $(".main-page").show();
      $("#entry-screen").hide();
      $('#password').val("");
    }

    // Applies handlebar template and stars plugin
    function loadMoviesToPage (library) {
      $("#results").html(eachMyMoviesTemplate(library));
      $(".rating").rating();
    }

    function searchUsSomeResults(searchForThis) {
      usersLibrary(auth) // collects promise from user-library.js
      .then(function(userUniqueLibrary) {
        userSearchResults = searchMyMovies(searchForThis, userUniqueLibrary);
        console.log("userSearchResults1", userSearchResults);
        loadMoviesToPage(userSearchResults); // just slaps handlebars on user's search results
        console.log("userSearchResults", userSearchResults);
        return loadSearch.populateMovies(auth, searchForThis);
      })
      .then(function(omdbSearchResults) {
        console.log("omdbSearchResults", omdbSearchResults);
        $("#results").append(eachMovieTemplate(omdbSearchResults));
        $(".rating").rating();
        // test against user's library so we don't populate if already in thing...
      })
      .fail(function(error) {
        console.log("error", error);
      });
    } // END SEARCH OMDB FUNCTION

    function beginWebApplication(thisUserAuth, email, password) {
      usersLibrary(auth) // receives promise state from user-library.js
      // Puts results to DOM, according to which user loads

        .then(function(allUserMovies) {
          var fireurl = "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + thisUserAuth +"/";
          console.log("fireurl", fireurl);
          var firebaseConnection = new Firebase(fireurl);
          firebaseConnection.on("value", function(snapshot) {
            var movie = snapshot.val();

            loadMoviesToPage(movie);
            console.log("userSearchValue", userSearchValue);
            searchUsSomeResults(userSearchValue);

            console.log("movie", movie);
          }); //End on Value Function

          // loadMoviesToPage(allUserMovies);
        }) // End then
        .fail(function(error) {
          console.log("error", error);
        });
    } // closes beginWebApplication function
    
    //Start logout function
    $("#logout-button").click(function(e) {
      console.log("You have clicked the logout button!", auth);
      if (auth) {
        auth = null;
        myFirebaseRef.unauth();
        $("#results").html("");
        $(".page").hide(); // potentially change in future
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
          console.log("authConfirm", auth);
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
          console.log("userInput", userSearchValue);
          searchUsSomeResults(userSearchValue);
        } // closes else

      } // closes if user hits enter
    }); // closes keyup

    ////// BELOW HERE, FUNCTIONALITY WILL CHANGE ///////
 
  $("#search-my-movie-library").on("click", function(){
    searchMyMovies(auth); // potentially need userlibrary and title collected on click

  }); // closes click function of search my movies

  $(document).on("click", ".movie-add", function(e){
    console.log("You clicked the add button");
    loadSearch.clickToAdd(e);
  });

  $(document).on("click", ".delete-button", function(e){
    console.log("You clicked the delete button");
    var movieKey = e.target.getAttribute('key');
    deleteMovie(movieKey, auth)
    .then(function(){
      // usersLibrary(auth);
    });
  });

  $(document).on("click", ".movie-watch", function(e){
    console.log("You clicked the watch button");
    var movieKey = e.target.getAttribute('key');
    movieChange.watchMovie(movieKey, auth)
    .then(function(){
      // usersLibrary(auth);
    });
  });

  $(document).on('rating.change', function(event, starValue) {
    console.log(starValue);
    var starKey = event.target.id;
    console.log("starKey", starKey);
    movieChange.rateMovie(starKey, auth, starValue)
    .then(function(){
      // usersLibrary(auth);
    });
  });


  $(document).on("click", ".clickAll", function(e){
    console.log("You clicked the All button at top");
    userSearchValue = "";
    usersLibrary(auth)
    .then(function(allUserMovies) {
      loadMoviesToPage(allUserMovies);
      $("#all-user-title").show();
    });
  });

  $(document).on("click", ".clickWatch", function(e){
    console.log("You clicked the WATCHED button at top");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").hide();
    $("#all-user-title").hide();
    $(".search-result").hide();
  });

  $(document).on("click", ".clickUnwatch", function(e){
    console.log("You clicked the UNWATCHED button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").show();
    $("#all-user-title").hide();
    $(".search-result").hide();
  });

  $(document).on("click", ".clickFave", function(e){
    console.log("You clicked the Fave button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").hide();
    $("div[fave='5']").show();
    $("#all-user-title").hide();
    $(".search-result").hide();
  });

});// Close page


