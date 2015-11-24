define(["dependencies", "q"], function(_$_, Q) {

	function addModal(userAuth, movieKey) {
      $.ajax({//function gets called in central-handling file
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+ userAuth +"/" + movieKey + "/.json"
      	}).done(function(modalData) {
          console.log("modaldata", modalData); //the movie information of the movieposter you click on.
          console.log("modal-year", modalData.Year);
          $('#posterModal').modal();
          require(['hbs!../templates/modal'], function(modalTemplate) {
      		console.log("modalTemplate", modalTemplate);
            $("#modal-body").html(modalTemplate(modalData));
          });
      	});
	}
	return addModal;
 });
