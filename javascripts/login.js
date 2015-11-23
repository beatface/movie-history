define([], function() {


function findOrCreateNewUser (myFirebaseRef, thisUserAuth, userEmail, userPassword) {
  var usersFirebase = myFirebaseRef.child("users");
  var allUsersLibrariesFirebase = myFirebaseRef.child("all-users-libraries");
  var userExists = false;

  // Checks to see if user exists
  usersFirebase.once("value", function(allUsersSnap){
  	console.log("allUsers", allUsersSnap.val());
    allUsersSnap.forEach(function(allUsersChildSnap) {
   	  console.log("allUsersChildSnap", allUsersChildSnap.val());
      if (allUsersChildSnap.val().email === userEmail) { // Checks to see if there's an email already logged, if so, user exists.
      	console.log("hello from yes");
        userExists = true;
      }
    });

      // If doesn't exist, creates user, and creates user library
      if (userExists === false) {
        console.log("userExists", userExists);

        // Creates this new user's unique profile.
        var thisUserFirebase = usersFirebase.child("user_" + thisUserAuth);
        thisUserFirebase.set({
          "email": userEmail,
          "password": userPassword
        });
        
      } // closes add new user    

  }); // closes process of checking if user is unique

	
}
	return findOrCreateNewUser;
});
