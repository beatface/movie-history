require.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../lib/bower_components/jquery/dist/jquery.min',
    'lodash': '../lib/bower_components/lodash/lodash.min',
    'hbs': '../lib/bower_components/require-handlebars-plugin/hbs',
    'q': '../lib/bower_components/q/q',
    'bootstrap': '../lib/bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../lib/bower_components/firebase/firebase',
    'stars': '../lib/bower_components/bootstrap-star-rating/js/star-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'stars': ['bootstrap']
  }
});

require(
["dependencies", "login", "q", "logout", "grabmovies", "loadSearch", "stars"], 
function(_$_, login, Q, logout, grabMovies, loadSearch, stars) {


  $(document).on("click", ".clickety", function(e){
    console.log("You clicked the | button inbetween");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").show();
  });

  $(document).on("click", ".clickWatch", function(e){
    console.log("You clicked the WATCHED button at top");
    $("div[watchtoggle='true']").show();
    $("div[watchtoggle='false']").hide();
  });

  $(document).on("click", ".clickUnwatch", function(e){
    console.log("You clicked the UNWATCHED button at top");
    $("div[watchtoggle='true']").hide();
    $("div[watchtoggle='false']").show();
  });

  $("#search-my-movie-library").on("click", function(){
    $("#watch-unwatch").removeClass('test');
  });


});