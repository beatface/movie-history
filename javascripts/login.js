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
          }

          var usersFirebase = myFirebaseRef.child("users");
          var userExists = false;

          console.log("this is yr auth where you need it", auth.uid);
          $("#modal-search-btn").on("click", function(){
            loadSearch.populateMovies(authData.uid);
          });

          usersFirebase.once("value", function(dataSnap){
            dataSnap.forEach(function(childSnap) {
              if (childSnap.val().uid === authData.uid) {
                userExists = true;
              }
            });

            if (userExists === false) {
              usersFirebase.push({
                "uid": authData.uid,
                "email": email,
                "password": password
              });
            }


          });
          return returnusers.retrieveUsers();
        })
        .fail(function(error) {
          console.log("error", error);
        });


        //Start logout function
        $("#logout-button").click(function(e) {
          console.log("You have clicked the logout button!", auth);
          if (auth) {
            auth = null;
            myFirebaseRef.unauth();
            console.log("what's going on", auth);
            
          }

        }); //END LOGOUT FUNCTION

    }); //END LOGIN FUNCTION



});// END REQUIRE FUCTION

