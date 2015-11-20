require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../lib/bower_components/firebase/firebase'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

require(
["dependencies", "login", "q", "logout"], 
function(_$_, login, Q, logout) {


// Page turning functionality here, communicates with tags, classes and ids in index.html
$("#user-to-filter").hide();

$(".page").hide();
    $("#entry-screen").show();
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();
    });

//Instructions to add a page:
  // add page to index.html within <section class="page"> </section>
  // in button that will submit info/turn page, add class="page-turn" and attribute next="<next page here>". Make sure class of 'next' page matches identically the text within next="" attribute.




});