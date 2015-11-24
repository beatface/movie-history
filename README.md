# Movie History

Movie History is created by Amy Lee Bennett, Mathew Ostrander, and Andri Alexandrou.

## Requirements
1. Must have the ability to register a user in Firebase
1. Must have the ability to log in
1. You must use Firebase to store movies
1. You must be able to add movies
1. You must be able to remove movies
1. Each movie must have the following properties
   1. Movie name
   1. Year released
   1. An array of major actors
   1. An integer rating of 1-5
   1. A boolean value that, if true, means that you have watched the movie
1. You must be using Grunt to automate Javascript testing
1. You must be using Grunt to automate SASS compilation

## Progress

*Please view [our Trello board](https://trello.com/b/APqiIaV4/movie-history) for development progress and good places to jump in.*

Need to Install: 
Jquery, Handlebars, Lodash, HandleBars, Q, Bootstrap, Firebase, Bootstrap, Stars (bootstrap plugin)

Javascript files:
central-handling : Our central spot for all of our event handlers
dependencies : Defines bootstrap, jquery, handlebars, firebase, q
main : includes requre.config information
login : Logs an existing user in
user-sign-up : Authenticates a new user and pushes user email, password into firebase
loadSearch : Populates movies from omda api and inserts into handlebar template each_movie.hbs on search movies in nav through PopulateMovies function.
With clickToAdd function, movies populated through search are then stored into firebase when add button is clicked. Function addSearchModal has a modal appear when searched movies are clicked on. Modal includes title of movie, year, and actors. 
grabMovies : 




