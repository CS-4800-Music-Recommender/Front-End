# BPM Music Recommender
Music Recommender that allows you to get songs recommended to you based off the artist or song that you provide. You can also login and save the playlist to your account.
Built using React + Vite, React-Bootstrap, Firestore, and Auth0.

## Prerequsites
Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/).
* You have a `Windows/Linux/Mac` machine. State if there are any specific OS requirements.
* You have a Spotify Developer account
* You have an Auth0 account

## Installing/Setting up

To set up and install everything necessary for this project, follow the steps:

If you already have the source code on your local machine you can skip the first step

1. Clone the repository using git clone https://github.com/CS-4800-Music-Recommender/Front-End.git

2. Navigate to the project directory, and open up a terminal, preferably in VS Code

3. Install the dependencies by typing into your terminal 'npm install' (or you can use pnpm, yarn, or whatever you want)

4. Create a .env file in the same directory the .env.sample file is in, and fill out the .env with the information shown in the .env.sample file using your Spotify and Auth0 keys.

5 (Optional). If the firebase server isn't functional anymore, you can create your own one for free and replace the existing config settings in ./src/pages/PlaylistPage.jsx at lines 28-35 with your own Firebase DB settings. 

To use the Auth0 functionality, you must also set up the Auth0 application to properly handle your localhost ports properly.

## Running the app

To run the app locally, you'd write "npm start" in your terminal to start a local dev build

The app will then be available at a specific localhost provided to you by Vite.