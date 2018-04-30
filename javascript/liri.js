var express = require('express');
var router = express.Router();

// include packages  
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var keys = require('./keys.js');


console.log('keys: ', keys)

// create app clients
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
  response = JSON.stringify(data)
  console.log(response)
});

// Takes in all of the command line arguments
var inputString = process.argv;

// Parses the command line argument to capture the "operand" (add, subtract, multiply, etc) and the numbers
var command = inputString[2];
var arg1 = inputString[3];


console.log('command: ', command)
console.log('arg1: ', arg1)


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
