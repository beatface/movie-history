define(["dependencies", "q"], function(_$_, Q) {

	function addModal(passedAuth, movieKey) {
      $.ajax({//function gets called in central-handling file
      	url: "https://ama-moviehistory.firebaseio.com/all-users-libraries/user_library_"+ passedAuth +"/" + movieKey + "/.json"
      	}).done(function(modalData) {
          console.log("modalData", modalData);
          require(['hbs!../templates/modal'], function(modalTemplate) {
            $("#modal-body").html(modalTemplate(modalData));
          });
          $(".modal-title").html(modalData.Title);
          $('#posterModal').modal();
      	});
	}
	return addModal;
 });
