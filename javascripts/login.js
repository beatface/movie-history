define(["dependencies", "authcall", "return-users", "createuser", "q", "loadSearch", "user-library", "delete-movie", "movie-change"], 
  function(_$_, authCall, returnusers, createuser, Q, loadSearch, usersLibrary, deleteMovie, movieChange) {
    $(".page").hide();
    $("#entry-screen").show();
    
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");

    myFirebaseRef.child("users").on("value", function(snapshot) {

    });

    var auth;
    var signup = false;
    $('#signupButton').on("click", function(){
      signup = true;
      var email = $('#email').val();
      var password = $('#password').val();
      createuser(email, password, myFirebaseRef)
      .then(function(authData) {
          auth = authData;
          console.log("authData from signup", authData);

          var usersFirebase = myFirebaseRef.child("users");
          var userExists = false;

          console.log("usersFirebase", usersFirebase);
          usersFirebase.once("value", function(dataSnap){
            dataSnap.forEach(function(childSnap) {
              if (childSnap.val().uid === authData.uid) {
                userExists = true;
              }
            });

            console.log("ANYTHING IN HERE??");
            if (userExists === false) {
              usersFirebase.push({
                "uid": authData.uid,
                "email": email,
                "password": password
              });
            }

            $(".main-page").show();
            $("#entry-screen").hide();
            $('#password').val("");
          });

          return returnusers.retrieveUsers();
        })
      .fail(function(error) {
          console.log("error", error);
        });
      console.log(signup);
    }); // END SIGNUP FUNCTION]


    // User authentication, private process w/ Firebase
    $('#login').on("click", function(){
      var email = $('#email').val();
      var password = $('#password').val();
      authCall(email, password, myFirebaseRef) 
        // Send email and password for login authentication
        .then(function(authData) {
          auth = authData;

          if (authData.uid) {
            
            $(".main-page").show();
            $("#entry-screen").hide();
            $('#password').val("");
          }

          var thisUserAuth = authData.uid;
          var usersFirebase = myFirebaseRef.child("users");
          var allUsersLibrariesFirebase = myFirebaseRef.child("all-users-libraries");
          var userExists = false;

          $("#modal-search-btn").on("click", function(){
            loadSearch.populateMovies(authData.uid);
          });

          // Checks to see if user exists
          usersFirebase.once("value", function(dataSnap){
            dataSnap.forEach(function(childSnap) {
              if (childSnap.val().email) { // Checks to see if there's an email already logged, if so, user exists.
                userExists = true;
              }

              // If doesn't exist, creates user, and creates user library
              if (userExists === false) {
                console.log("userExists", userExists);
                // Creates this new user's unique library, to which each movie is added.
                var thisUserLibraryFirebase = allUsersLibrariesFirebase.child("user_library_" + thisUserAuth);
                thisUserLibraryFirebase.set({
                    "uid": thisUserAuth
                }); // closes add new library

                var thisUserFirebase = usersFirebase.child("user_" + thisUserAuth);
                thisUserFirebase.set({
                  "email": email,
                  "password": password

                });
                

              } // closes add new user

            });

          });
          return returnusers.retrieveUsers();
        })
        .fail(function(error) {
          console.log("error", error);
        });


        //Start logout function
        $("#logout-button").click(function(e) {
          console.log("You have clicked the logout button!", auth);
          if (auth.uid) {
            auth = null;
            myFirebaseRef.unauth();
            console.log("what's going on", auth);

            $(".page").hide();
            $("#entry-screen").show();
            
          }

        }); //END LOGOUT FUNCTION

    }); //END LOGIN FUNCTION

 $("#search-my-movie-library").on("click", function(){
    var myTitleInput = $("#myTitleInput").val();
    console.log("titleinput", myTitleInput);
    console.log("authuid", auth.uid);
    // console.log("authtitle", auth.title); //doesn't work
    
    $.ajax({
        url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_" + auth.uid + "/.json"
        }).done(function(allmovies) {
          console.log("allmovies", allmovies);
        if (myTitleInput === ""){
          console.log("inside if");
          usersLibrary.getLibrary(auth.uid);
        } else {
          console.log("inside else");
          require(['hbs!../templates/each_my_movies'], 
            function(getMyMoviesTemplate) {
            console.log("titleInput", myTitleInput);
            for (var movie in allmovies) {
              if (allmovies[movie].Title === myTitleInput) {
                console.log("selected movie", movie);
                console.log("allmovie[movie]", allmovies[movie]);
                    $("#results").html(getMyMoviesTemplate({"thing":allmovies[movie]}));
              }
            }
          }); // :)Closes the AREquire function
          
        } //closes else
    }); // closes .done statement



    // if (usersLibrary.getLibrary(auth.title) === titleInput) {
    //   console.log("usersLibrary--matching title", usersLibrary.getLibrary(auth.title)); 
    // }
  }); // closes click function

    //-----------

  $(document).on("click", ".movie-add", function(e){
    console.log("You clicked the add button");
    loadSearch.clickToAdd(e);
  });

  $(document).on("click", ".delete-button", function(e){
    console.log("You clicked the delete button");
    var movieKey = e.target.getAttribute('key');
    deleteMovie(movieKey, auth.uid)
    .then(function(){
      usersLibrary.getLibrary(auth.uid);
    });
  });

  $(document).on("click", ".movie-watch", function(e){
    console.log("You clicked the watch button");
    var movieKey = e.target.getAttribute('key');
    movieChange.watchMovie(movieKey, auth.uid)
    .then(function(){
      usersLibrary.getLibrary(auth.uid);
    });
  });

  $(document).on('rating.change', function(event, starValue) {
    console.log(starValue);
    var starKey = event.target.id;
    console.log("starKey", starKey);
    movieChange.rateMovie(starKey, auth.uid, starValue)
    .then(function(){
      usersLibrary.getLibrary(auth.uid);
    });
  });

});// END REQUIRE FUCTION

