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
console.log("grabmovies", grabMovies);


// Page turning functionality, communicates with tags, classes and ids in index.html


//Instructions to add a page:
  // add page to index.html within <section class="page"> </section>
  // in button that will submit info/turn page, add class="page-turn" and attribute next="<next page here>". Make sure class of 'next' page matches identically the text within next="" attribute.

//when search button on modal is clicked, then findMovie function happens

$("#modal-search-btn").on("click", function(){
  console.log("hellooo");
  loadSearch.populateMovies();

  require(['hbs!../templates/each_movie'], function(getMovieTemplate){
    $('#results').html(getMovieTemplate());
  });
});

$("#search-my-movie-library").on("click", function() {
  console.log("should load my movie library");

  require(['hbs!../templates/each_my_movies'], function(getMyMoviesTemplate) {
    $("#results").html(getMyMoviesTemplate());
  });
});


});