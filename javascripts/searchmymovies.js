define(function(require) {
  var _$_ = require("dependencies");
  var Q = require("q");
  var usersLibrary = require("user-library");


$("#search-my-movie-library").on("click", function(){
	console.log("clicked searchmymovie");
	titleInput = $("#titleInput").value();
	
	if (titleInput === usersLibrary.getLibrary(auth.title)) {

	}
});

});