// include packages  
var dotenv = require("dotenv").config();
var inquirer = require('inquirer');
var request = require('request');
var fs  = require("fs");

// include moment.js
var moment = require('moment');
moment.suppressDeprecationWarnings = true;

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

// create app clients
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

 // Array of Liri commands
var commands = ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']

// random.txt
var lines = fs.readFileSync('./random.txt').toString().split('\n');
var lines_count = lines.length - 1;

// Display help
displayHelp()
getInput()

function getInput() {
  // Ask for user input
  inquirer.prompt([
    {
      type: "input",
      name: "userInput",
      message: "Hi, I'm Liri. How may i assist you?",
      validate: function validateInput (name) {
        var splits = name.split(" ");
        var liriCommand = splits[0];
        var liriArg = splits.slice(1).join(' ')
        if (commands.includes(liriCommand)) {
          return true
        } else {
          console.log('\n***************************************************\n')
          console.log('Invalid command! Try again!')
          console.log('\n***************************************************\n')
          return false
        }
      }
    }

  ]).then(function(answer) {
    var input = answer.userInput
    var splits = input.split(" ");
    var liriCommand = splits[0];
    var liriArg = splits.slice(1).join(' ')
    runLiri(liriCommand, liriArg)
  });
}

function runLiri(command, argString) {

  // Handling invalid user command
  if(!commands.includes(command)) {
    console.log('\n***************************************************\n')
    console.log('Invalid command! Try again!')
    displayHelp()
  }
  // The 'my-tweets' command will show your last 20 tweets and when they were created at in your terminal/bash window. 
  if(command === 'my-tweets') {
    console.log('\n***************************************************\n')
    var params = {screen_name: 'real_joeyk', count: 20};
    console.log('Retrieving your last ' + params.count + ' tweets...')
    console.log('\n***************************************************\n')
    lookupTweets(params)
  }

  // The 'spotify-this-song' command will look up song info and diplay it in your terminal window: 
  //    * Artist(s)
  //    * The song's name
  //    * A preview link of the song from Spotify
  //    * The album that the song is from

  if(command === 'spotify-this-song' && argString != '') {
    console.log('\n***************************************************\n')
    console.log('Looking up the song, ' + argString)
    console.log('\n***************************************************\n')
    var params = { type: 'track', query: '"' + argString + '"', limit: 10 }
    lookupSong(params) 
  } else if(command === 'spotify-this-song' && argString === '') {
    var params = { type: 'track', query: '"The Sign"', artist : '"Ace of Base"',  limit: 1 }
    console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
    lookupSong(params)
  }
  // The 'movie-this' command will output the following to your terminal: 
  //    * Title of the movie.
  //    * Year the movie came out.
  //    * IMDB Rating of the movie.
  //    * Rotten Tomatoes Rating of the movie.
  //    * Country where the movie was produced.
  //    * Language of the movie.
  //    * Plot of the movie.
  //    * Actors in the movie.

  if(command === 'movie-this' && argString != '') {
    lookupMovie(argString);
  } else if (command === 'movie-this' && argString ==='') {
    lookupMovie('Mr. Nobody')
  }

  if(command === 'do-what-it-says') {
    for (i=0; i<lines_count; i++) {
      setDelay(i);
    }

    function setDelay(i) {
      setTimeout(function(){
        var splits = lines[i].split(',')
        var command = splits[0]
        var arg = splits[1]
        runLiri(command, arg)
      }, i * 1500);
    }
      // Using a promise so that 'do-what-it-says' tasks finish in sequential order
    // var bar = new Promise((resolve, reject) => {
    //   array.forEach((value, index, array) => {
    //     setTimeout(function() {
    //       var splits = value.split(',')
    //       var command = splits[0]
    //       var arg = splits[1]
    //       runLiri(command, arg)
    //     },
    //     2000);
    //     if (index === array.length -1) resolve();
    //   });
    // });

    // bar.then(() => {
    //     console.log('All done!');
    // });

  } 

}

// This function looks up your most recent tweets and displays their text and date
function lookupTweets(params) {
  client.get('statuses/user_timeline', params)
    .then(function (tweets) {
      for (var key in tweets) {
        var text = tweets[key].text;
        var date = tweets[key].created_at;
        var longdate = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");

        console.log('\nTweet #' + key + ': ' + '"' + text + '"');
        console.log(longdate);
        console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
      }
      getInput()
    })
    .catch(function (error) {
      console.log('\nThere was an error! Try again!');
      getInput()
    })
}

// This function takes in a string  'song' and returns info about it from the Spotify API
function lookupSong(params) {
  spotify.search(params, function(err, data) {
    if (data.tracks.items === undefined || data.tracks.items == 0) {
      console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
      console.log('That\'s not a song in the Spotify database. Try another one!')
      console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
      getInput()
    } else {
      // Code to run if response is not an error
      var songObjects = data.tracks.items
      for (var key in songObjects) {
        var songArtists = songObjects[key].artists
        var artistName = songArtists[0].name
        var songName = songObjects[key].name
        var preview_url = songObjects[key].preview_url
        var albumName = songObjects[key].album.name
        
        // Log song's information to the console
        console.log('Artist: ' + artistName)
        console.log('Song: ' + songName)

        if (preview_url === null) {
          console.log('Preview: Not available')
        } else {
          console.log('Preview: ' + preview_url)
        }
        console.log('Album: ' + albumName)
        console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
      } 
      getInput()
    }

    
  });
}
function lookupMovie(movie) {
  var query = 'http://www.omdbapi.com/?apikey=trilogy&t=' + encodeURIComponent(movie)
  request(query, function (error, response, body) {
    var bodyObject = JSON.parse(body)
    var title = bodyObject.Title

    // handling faulty user input 
    if (response && response.statusCode===200 && typeof title === "undefined") {
      console.log('\n***************************************************\n')
      console.log('Movie not found! Try again!')
      console.log('\n***************************************************\n')
      getInput()
    // handling expected response
    } else if (response && response.statusCode===200 && typeof title != 'undefined') {
      console.log('\n***************************************************\n')
      console.log('Looking up: ' + movie)
      console.log('\n***************************************************\n')
      // * Title of the movie.
      var title  = bodyObject.Title
      console.log('Title: ' + title)

      // * Year the movie came out.
      var year = bodyObject.Year
      console.log('Year: ' + year)

      // * IMDB Rating of the movie.
      var imdbRating = bodyObject.imdbRating
      console.log('IMDB Rating: ' + imdbRating)

      // * Rotten Tomatoes Rating of the movie.
      var ratings = bodyObject.Ratings
      ratings.forEach(function(element) {
        var source = element.Source
        // This code only runs if there is a Rotten Tomatoes rating in the response
        if(source === 'Rotten Tomatoes') {
          console.log('Rotten Tomatoes rating: ' + element.Value)
        }
      });

      // * Country where the movie was produced.
      var country = bodyObject.Country
      console.log('Country: ' + country)

      // * Language of the movie.
      var language = bodyObject.Language
      console.log('Language: ' + language)

      // * Plot of the movie.
      var plot = bodyObject.Plot
      console.log('Plot: ' + plot)

      // * Actors in the movie.
      var actors = bodyObject.Actors
      console.log('Actors: ' + actors)
      console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - -\n')
      getInput()
    } else if(error) {
      console.log('error:', error); // Print the error if one occurred
      getInput()
    }
  });
} 
// function for displaying instructions to user
function displayHelp() {
  console.log('\n***************************************************\n')
  console.log('LIRI is like iPhone\'s SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI takes in commands via the command line and gives you back data.\n')
  console.log('LIRI accepts the following commands:\n')
  console.log('`my-tweets`\n')
  console.log('This will show your last 20 tweets and when they were created\n')
  console.log('`spotify-this-song <song name>`\n')
  console.log('This will show information about the song retrieved from the Spotify API.\n')
  console.log('`movie-this <movie name>`\n')
  console.log('This will show information about the movie retrieved from the OMDB API\n')
  console.log('`do-what-it-says`\n')
  console.log('Using the fs Node package, LIRI will take the text inside of random.txt and use it to call one of LIRI\'s commands.\n')
  console.log('-----\n')
  console.log('For example, try entering:\n')
  console.log('`movie-this the cat in the hat`\n')
  console.log('-----\n')
}



