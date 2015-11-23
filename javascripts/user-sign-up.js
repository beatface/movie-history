define(["createuser", "return-users"], function(createuser, returnusers) {

	console.log("hello from user-sign-up");


function registerUser(email, password, myFirebaseRef){
      signup = true;

	var auth;
	createuser(email, password, myFirebaseRef)
      .then(function(authData) {
          auth = authData;
          console.log("authData from signup", authData);

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

            $(".main-page").show();
            $("#entry-screen").hide();
            $('#password').val("");
          });

          return returnusers();
        })
      .fail(function(error) {
          console.log("error", error);
        });
      console.log(signup);
  } // closes function registerUser

  return registerUser;



});