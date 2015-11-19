require(["dependencies", "authcall", "return-users", "createuser", "q"], 
  function(_$_, authCall, returnusers, createuser, Q) {
    
    var myFirebaseRef = new Firebase("https://ama-moviehistory.firebaseio.com/");

    myFirebaseRef.child("users").on("value", function(snapshot) {

    });

    var auth;
    var signup = false;
    $('#signupButton').on("click", function(){
      signup = true;
      var email = $('#email').val();
      var password = $('#password').val();
      createuser.createTheUser(email, password, myFirebaseRef)
      .then(function(authData) {
          auth = authData;
          console.log("authData from signup", authData);
          return returnusers.retrieveUsers();
        })
      .fail(function(error) {
          console.log("error", error);
        });
      console.log(signup);
    });

    // User authentication, private process w/ Firebase
    $('#login').on("click", function(){
      var email = $('#email').val();
      var password = $('#password').val();
      authCall(email, password, myFirebaseRef) 
        // Send email and password for login authentication
        .then(function(authData) {
          auth = authData;

          console.log("authData", authData.uid);

          var usersFirebase = myFirebaseRef.child("users");
          var userExists = false;

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

    });

    });