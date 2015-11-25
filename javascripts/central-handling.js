define(["dependencies", "authcall", "return-users", "create-user-in-private-firebase", "q", "loadSearch", "user-library", "delete-movie", "movie-change", "user-sign-up", "login", "searchmymovies", "add-modal", "hbs!../templates/each_my_movies", "hbs!../templates/each_movie"], 
  function(_$_, authCall, returnusers, createUserInPrivateFirebase, Q, loadSearch, usersLibrary, deleteMovie, movieChange, userSignUp, loginUniqueUser, searchMyMovies, addModal, eachMyMoviesTemplate, eachMovieTemplate) {
    
    $(".page").hide(); // on page load, everything is hidden

    $("#entry-screen").show();

    var auth;
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");
    var email, password;
    var signup = false;

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
        var userSearchValue = userSearchField.val(); // gathers user input in search
        var userSearchResults;

        // If search bar is empty, loads user's movie catalog
        if (userSearchValue === "") {
          console.log("should not have triggered serachMyMovies");
          usersLibrary(auth)
            .then(function(allUserMovies) {
              loadMoviesToPage(allUserMovies);
            })
            .fail(function(error) {
              console.log("error", error);
            });
        } 

        // If user entered value into search bar
        else {  
          userSearchField.val("");
          console.log("userInput", userSearchValue);

            usersLibrary(auth) // collects promise from user-library.js
              .then(function(userUniqueLibrary) {
                userSearchResults = searchMyMovies(userSearchValue, userUniqueLibrary);
                loadMoviesToPage(userSearchResults); // just slaps handlebars on user's search results
                console.log("userSearchResults", userSearchResults);
                return loadSearch.populateMovies(auth, userSearchValue);
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
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").show();
  });

  $(document).on("click", ".clickWatch", function(e){
    console.log("You clicked the WATCHED button at top");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").hide();
  });

  $(document).on("click", ".clickUnwatch", function(e){
    console.log("You clicked the UNWATCHED button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").show();
  });

  $(document).on("click", ".clickFave", function(e){
    console.log("You clicked the Fave button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").hide();
    $("div[fave='5']").show();
  });

});// Close page


