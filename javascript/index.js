// Include the following NPM package (Remember to run "npm install"!)
var geocoder = require("geocoder");
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

function playRound() {

  // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.
  inquirer.prompt([
    {
      type: "list",
      name: "userGuess",
      message: "Try to stay alive! Guess a number between [1-5]",
      choices: ["1", "2", "3", "4", "5"]
    }

  ]).then(function(guess) {

    // If the user is still alive or the zombie is still alive
    if (userHealth > 0 || zombieHealth > 0) {

      // Assign a random damage value for the round.
      var damage = Math.floor(Math.random() * 5) + 1;

      // The zombie should choose a random number.
      var zombieNum = Math.floor((Math.random() * 5)) + 1;
      console.log("");
      console.log("");
      console.log("Zombie rolled " + zombieNum);

      // If the user's guess matches the number then...
      if (zombieNum === parseInt(guess.userGuess)) {

        // Subtract the damage amount from the zombie's health.
        zombieHealth -= damage;
        console.log("YOU HIT THE ZOMBIE WITH " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();
      }

      else {
        // Subtract the damage amount from the user's health.
        userHealth -= damage;
        console.log("OH NO! The zombie slashed you with " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();

      }
    }
  });
}
