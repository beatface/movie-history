define(["create-user-in-private-firebase"], function(createUserInPrivateFirebase) {

  	function firebaseAuthentication (authData, myFirebaseRef) {
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
        $('#password').val("");
      });
  	} // closes firebaseAuthentication function


	function registerUser(email, password, myFirebaseRef){
	    signup = true;

		createUserInPrivateFirebase(email, password, myFirebaseRef)
	      .then(function(authData) {
	      	firebaseAuthentication(authData, myFirebaseRef); // calls function above, passes in data from createuser. if new user, creates new user and userlibrary.
	    	return authData;
	      })
	      .fail(function(error) {
	          console.log("error", error);
	        });
	  } // closes function registerUser
	
	return registerUser;

});