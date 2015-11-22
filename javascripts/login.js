define(["dependencies", "authcall", "return-users", "createuser", "q", "loadSearch"], 
  function(_$_, authCall, returnusers, createuser, Q, loadSearch) {
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



});// END REQUIRE FUCTION

