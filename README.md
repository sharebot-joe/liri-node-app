# liri-node-app

<img src="letterL.png" alt="LIRI" width="180" height="180">

#### LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI takes in commands via the command line and gives you back data.

## Commands

LIRI accepts the following commands:

* `my-tweets` will show your last 20 tweets and when they were created.
* `spotify-this-song <song name>` will show information about the song retrieved from the Spotify API.
* `movie-this <movie name>` will show information about the movie retrieved from the OMDB API.
* `do-what-it-says` will take the text inside of random.txt and use it to call one of LIRI's commands.

## Environment Variables

To use LIRI to retrieve API data, you'll need to create a .env file with your personal API keys. Create a file named .env and add the following to it, replacing the values with your API keys (no quotes) once you have them:

**Spotify API keys**

`SPOTIFY_ID=your-spotify-id`<br/>
`SPOTIFY_SECRET=your-spotify-secret`

**Twitter API keys**

`TWITTER_CONSUMER_KEY=your-twitter-consumer-key`<br/>
`TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret`<br/>
`TWITTER_ACCESS_TOKEN_KEY=your-access-token-key`<br/>
`TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret`

The .env file will be used by the dotenv package to set environment variables for your node session.

## Twitter API Keys:

Get your Twitter API keys by following these steps:

1. Visit https://apps.twitter.com/app/new
2. Fill out the form with dummy data. Type http://google.com in the Website input. Don't fill out the Callback URL input. Then submit the form.
3. On the next screen, click the 'Keys and Access Tokens' tab to get your consume key and secret. Copy and paste them into your .env file, replacing the 'your-twitter-consumer-key' and 'your-twitter-consumer-secret' placeholders.
4. At the bottom of the page, click the 'Create my access token' button to get your access token key and secret. Copy the access token key and secret displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for 'your-twitter-access-token-key' and 'your-twitter-access-token-secret'.

## Spotify API Keys

Get your Spotify API keys by following these steps:

1. Visit https://developer.spotify.com/my-applications/#!/
2. Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
3. Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
4. On the next screen, scroll down to where you see your client id and client secret. Copy and paste them into your .env file, replacing the placeholders for 'your-spotify-id' and 'your-spotify-secret'. All done!

## Running LIRI

Assuming you have Node.js installed on your computer:

1. Clone this Github repository and place the .env file you created above (now containing your new API keys!) into the cloned repo. 
2. Open a console window and navigate to the cloned repo.
3. Run `npm install` 
4. Run `node liri.js`
5. LIRI should start in the console window. Follow the instructions on the screen!
