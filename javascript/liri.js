// var express = require('express');
// var router = express.Router();



// include packages  

var dotenv = require("dotenv").config();
var inquirer = require('inquirer')

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');



console.log('keys: ', keys)
// console.log('process.env: ', process.env)
// create app clients
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
 
// // This code works
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//   response = JSON.stringify(data)
//   console.log(response)
// });

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture optional arguments
var command = inputString[2];
// var arg1 = inputString[3];
// console.log('command: ', command)
// console.log('arg1: ', arg1)
if(command === 'my-tweets') {
  // client.get('statuses/lookup', 3, function (error, response, body) {
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  // });
  var params = {screen_name: 'real_joeyk', count: 3};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var key in tweets) {
        var text = tweets[key].text;
        // var volume = jsonResponse.trends[key].tweet_volume;
        console.log(key, "text - " + text);
      }
      
      // console.log('response' + console.dir(response));
      // console.log(typeof response)

    }
  });
  // client.get('https://api.twitter.com/1.1/search/tweets.json', {q: 'from:name param',count: "3"},  function(error, tweets, response){
  //   if(error) {
  //     throw error;
  //   } else {
  //     console.log(tweets);  
  //   }
  // });
  // client.twitter(response) {
  //   show your last 20 tweets
  //   show when they were created
  // }

  // console.log(20 tweets)
}

// inquirer.prompt([

//   {
//     type: "input",
//     name: "userInput",
//     message: "Which location or landmark would you like to geocode?"
//   }

// // After the prompt, store the user's response in a variable called location.
// ]).then(function(location) {

//   // console.log(location.userInput);

//   // Then use the Google Geocoder to Geocode the address
//   // geocoder.geocode(location.userInput, function(err, data) {

//   //   console.log(JSON.stringify(data, null, 2));
//   // });

// });


// // Here's the variable we will be modifying with the new numbers
// var outputNum;

// // Determines the operand selected...
// // Based on the operand we run the appropriate math on the two numbers
// if (operand === "add") {
//   outputNum = parseFloat(num1) + parseFloat(num2);
// }

// else if (operand === "subtract") {
//   outputNum = parseFloat(num1) - parseFloat(num2);
// }

// else if (operand === "multiply") {
//   outputNum = parseFloat(num1) * parseFloat(num2);
// }

// else if (operand === "divide") {
//   outputNum = parseFloat(num1) / parseFloat(num2);
// }

// else if (operand === "remainder") {
//   outputNum = parseFloat(num1) % parseFloat(num2);
// }

// else if (operand === "exp") {
//   outputNum = Math.pow(num1, num2);
// }

// else if (operand === "algebra") {
//   outputNum = parseAlgebra(num1);
// }

// else {
//   outputNum = "Not a recognized command";
// }


// // Prints the outputNumber
// console.log(outputNum);


//
   // * Title of the movie.
   // * Year the movie came out.
   // * IMDB Rating of the movie.
   // * Rotten Tomatoes Rating of the movie.
   // * Country where the movie was produced.
   // * Language of the movie.
   // * Plot of the movie.
   // * Actors in the movie.
