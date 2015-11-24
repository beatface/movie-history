define(["dependencies", "q"], function(_$_, Q) {

	function addModal(userAuth, movieKey) {
      $.ajax({//function gets called in central-handling file
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+ userAuth +"/" + movieKey + "/.json"
      	}).done(function(modalData) {
          $('#posterModal').modal();
          require(['hbs!../templates/modal'], function(modalTemplate) {
            $("#modal-body").html(modalTemplate(modalData));
          });
      	});
	}
	return addModal;
 });
