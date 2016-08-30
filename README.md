# Netlight Node Workshop

## 1. Create a Slack-bot
### A. Create a new empty project

1. Go to https://github.com.  
Create a Github account if you don't already have one, and log in. Then go to https://github.com/new.

2. You should see an interface where you can name your project, manage if it should be public or private, and if some files should be added automatically.

  ![GitHub 1](assets/github1.png)

3. You have now set up an empty git project that you can add files to.

> *Git is a version control system that lets you save snapshots of your code, so that you can make changes without having to worry about losing your work, or breaking the program without knowing how you broke it.*

> *These snapshots are referred to as commits.*

> *Online services, like Github, are often used so that you can save your work in the cloud, and cooperate with other developers on a project.*

### B. Checkout the project to your computer
Use the SSH or the HTTPS link to checkout the project to your computer.

  ![GitHub 2](assets/github2.png)

```bash
$ git clone https://github.com/dlmr/demo.git
```

You can also select _"Open in Desktop"_ if you have installed the Github application.

### C. Create a empty npm project
Navigate to the project using your terminal and run `npm init` inside the directory to create a new npm project.

This command interactively creates a `package.json` file in your project, letting you specify several options for your new project.

The `package.json` file will be crucial in your project, as its a manifest of your project metadata, dependencies,
and can be used to specify npm scrips. It also serves as documentation to some extent, letting you version your project.

Remember, Node.js needs to be installed before this will work, as npm is packaged with it.

__Tip__: Add `"private": true` in the `package.json` to make sure we do not publish our bot by mistake.

### D. Add our first piece of code
Let's write our first piece of code, a classical Hello World.

Open your preferred editor and create a new file named `index.js` in the root of the project. When the file has been created add the following code to it.

```javascript
console.log('Hello World');
```

We can now start our very basic program by writing the following in the terminal.

```bash
$ node index.js
```

_We did not need to create the `package.json` to be able to do this but it will be of use to use a little later._

### E. Get API Token for Slack
First create an account for the Slack here: https://netlight-nodeworkshop.slack.com/signup

We now have the base from which we can create our Slack bot. One key thing that we need before continuing is an API token that can be used by our bot to communicate with Slack.

Go to https://netlight-nodeworkshop.slack.com/services/new/bot and select a name for your bot.

![Slack 1](assets/slack1.png)

Press _"Add bot integration"_ to create the bot in Slack.

![Slack 2](assets/slack2.png)

We now have an API Token that we can use for our bot.

### F. Install our first dependency
Using `npm install <package-name>` you can install dependencies directly in your project.

Let's now install a dependency that we can use to make it easier to create a Slack bot.

```bash
$ npm install slackbots --save
```

The dependency will now be added to your project and by using `--save` we will also add it to our `package.json`.

You will now see that a new folder have been created in your project, `node_modules`. It is inside this folder that Node.js will store the dependencies that are used in the project.

You can find more packages at [npmjs.org](httsp://npmjs.org).

### G. Create our Slack Bot
Now we have everything that we need to create our Slack bot.

Change the code in `index.js` to the following.
```javascript
// We import the package that we installed earlier
const SlackBot = require('slackbots');

// We create a new Slack bot using the Token and name from before
const bot = new SlackBot({
  // Replace <SLACK_TOKEN> with the token from step E
  token: '<SLACK_TOKEN>',
  // Replace <BOT_NAME> with the name from step E
  name: '<BOT_NAME>'
});

// This will be invoked when our bot has connected to Slack
bot.on('start', () => {
  // Define channel, where bot exist.
  // You can adjust it there https://my.slack.com/services
  bot.postMessageToChannel(
    // We select a channel that our bot should write to
    'general',
    // The message that the bot should post to the channel
    'Hello!'
  );
});
```

We can now start our bot by running `node index.js` again.

### H. Make our bot interactive
Yay, we now have a bot. But let's be honest here, it is not very exiting. We will now add some interactivity to it, making it respond to messages that are posted.

We will start with inviting it to a channel that we want the bot to interact with. We do this by writing `/invite @<BOT_NAME>` in the channel we want our bot in. With that done we can go ahead and update the code. Let's start with removing that it always writes a message when it starts. We will now instead change it to post to our own user so we now that it has been started correctly and then make it listen and respond to messages.

```javascript
// Everything above this line from before will be the same
bot.on('start', () => {
  // We will now make the bot post a message to a specific user on startup
  // Replace <USERNAME> with your username
  bot.postMessageToUser(
    // The user we want to send a message to
    '<USERNAME>',
    // The message to send
    'I am online!'
  );
});

// This will manage messages that are posted to the channel the bot is connect to
// Using it we can make the bot respond to what is posted
// For this to work we will first need to invite the bot to the channel
bot.on('message', (data) => {
  // data.text contains the message that was written in a channel or to the bot directly
  // data.channel contains the channel id
  // data.user contains the user id

  // When the bot sees a message that is exactly ping
  if (data.text === 'ping') {
    // It will answer with pong
    bot.postMessage(data.channel, 'pong');
  }
});
```

### I. Make it more complex
We now have the basic building blocks to improve our bot making it do more useful things.

Examples of this can be a bot that:
- giving suggestions on places to eat
- giving compliments to other users
- match consultants that want to eat lunch with each other
- give information about the weather

See the entire API that `slackbots` provides [here](https://github.com/mishk0/slack-bot-api) for inspiration on what can be done using this type of Slack bots.

Let's create a Slack bot that gives complements as an example.

We start with creating a list of compliments that our bot can select from.

```javascript
const compliments = [
  'You are fantastic!',
  'You are awesome!',
  'Your smile is contagious!',
  'You are an inspiration!'
];
```

Awesome! Now we we are ready to make our bot give a complement to a specified user.

```javascript
// The current compliment
let currentCompliment = 0;

bot.on('message', function(data) {
  // We define a RegExp pattern the bot is looking for
  // In this case it is looking for messages of the form "[Cc]omplement @username"
  // The [Cc] means that we accept the message to start with either a large C or a small c.
  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    // If the message matches the pattern, the user ID is extracted from the message
    const user = data.text.match(pattern)[1];

    if (user) {
      // The bot gets the user name from the user ID, and attempts to send the user a random complement
      bot.getUserById(user).then(({ name }) => {
        bot.postMessageToUser(name, compliments[currentCompliment]);
        currentCompliment =
          // We increase the current compliment with one
          (currentCompliment + 1 )
          // We are suing modulus here
          // It will make sure we never go outside of the array size
          // This will result in the following pattern with out current array 0, 1, 2, 3, 0, 1, 2, 3, 0, ...
          % compliments.length;
      });
    }
  }
});
```

### J. Handle the secret Slack token correctly
The Slack token that we have used in our code is a secret that should NOT be exposed on the internet. This is because it can be used to read potentially all messages that are posted in channels.

A good way to solve this is to use environment variables.

We will begin with updating our code and replacing the Slack token with `process.env.SLACK_TOKEN`.

```javascript
const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  // Replace <BOT_NAME> with the name from step E
  name: '<BOT_NAME>'
});
```

With this in place we just need a way to set it to the correct token so that our bot still functions. This is a bit difference between Windows and Mac & Linux.

__Windows__
```bash
set BOT_API_KEY=<SLACK_TOKEN> & node index.js
```

__Mac & Linux__
```bash
SLACK_TOKEN=<SLACK_TOKEN> node index.js
```

### K. Push the code
We have now completed the first version of our little bot and we can go ahead and commit it back to Github by running the following commands in our project from the terminal.

```bash
$ git add .
```
We start with telling git that we want push all files in our project.

```bash
$ git commit -m "Inital version of the bot"
```
We create a commit and add a message that describes what we have done.

```bash
$ git push origin master
```
We push the code to Github.

## 2. Run the bot in the cloud
We now have a small little bot that runs on our computer. To make it a bit more practical we would like to run it in the cloud instead so we can turn of our computer.

### A. Create Heroku account
Visit https://signup.heroku.com/dc, and sign up for a free Heroku account.

  ![Heroku](assets/heroku.png)

### B. Create a new Heroku app
In the dashboard, press the _'Create New App'_ button, to create a new app. Select a fitting name for your app and select Europe as runtime.

  ![Heroku](assets/herokuNew.png)

### C. Add Slack Token
In setting, press the reveal config vars to see your app's configuration variables. Add a key named `SLACK_TOKEN`, and the Slack token from step 1E.

![Heroku](assets/herokuToken.png)

### D. Add npm script to start the application
Lets add an npm script to our `package.json` so that Heroku can start the app.

```json
"scripts": {
  "start": "node index.js"
},
```

Now we can start our application using `npm start`.

### E. Specify Node.js version
Add engine with Node.js version to our `package.json`

```json
"engines": {
  "node": ">=6.0.0",
}
```

This will make sure that Heroku will use the latest version of Node.js when running our application.

### F. Define a Procfile

To describe to Heroku what kind of application we have created, we need to create a `Procfile`.

Create a file named `Procfile` and paste the following into the file:
```
worker: node index.js
```

This will let Heroku know how to start our app.

### G. Push the changes
Push your changes to Github so that Heroku can deploy our latest changes.

```bash
$ git add .
$ git commit -m "Added npm script and engine"
$ git push origin master
```

### H. Deploy our bot
Click on your newly create app and select the _'Deploy'_ tab. Select Github as deployment method, log into Github in the following popup and find your Slack bot repository.

  ![Heroku 2](assets/heroku2.png)

Press the _'Enable Automatic Deploys'_ button, so that each push to master deploys a new version of the bot. Trigger a manual deploy now by pressing the _'Deploy Branch'_ button

  ![Heroku 3](assets/heroku3.png)

_Disclaimer: If an app receives no traffic in a 30 minute period, the app will sleep until it receives web traffic._

## 3. Creating an npm package
Let's say that we see a need to reuse our compliments in some other place. We can refactor our project and create a separate 'compliments'-module that we will publish as a package to npm.

### A. Create a npm account
If you do not already have an npm user, go to https://www.npmjs.com/signup, and enter your credentials.

  ![GitHub 1](assets/npm.png)

### B. Create a new project
Create a new Github project by repeating steps 1A and 1B. Call your new Github project 'Compliments', (unless you have your own idea for a cool package, in which case feel free).

Create a new repository and npm package by repeating step 1.A - 1.C. Name your package `@<YOUR NPM USERNAME>/compliments`. By selecting a name that start with your username we will be able to create something that is called a scoped package. This is useful for personal projects like this one.

### C. Create a static compliments file
We will create a separate file containing our compliments. We do not need to do this but it will make the code a bit more structured.

Create a new file named `compliments.json`.

You can then go ahead and copy the list below or make your own, only your imagination sets the limits. :)

```javascript
[
    "Your smile is contagious.",
    "You look great today.",
    "You're a smart cookie.",
    "I bet you make babies smile.",
    "You have impeccable manners.",
    "I like your style.",
    "You have the best laugh.",
    "I appreciate you.",
    "You are the most perfect you there is.",
    "You are enough.",
    "You're strong.",
    "Your perspective is refreshing.",
    "You're an awesome friend.",
    "You light up the room.",
    "You deserve a hug right now.",
    "You should be proud of yourself.",
    "You're more helpful than you realize.",
    "You have a great sense of humor.",
    "You've got all the right moves!",
    "Is that your picture next to \"charming\" in the dictionary?",
    "Your kindness is a balm to all who encounter it.",
    "You're all that and a super-size bag of chips.",
    "On a scale from 1 to 10, you're an 11.",
    "You are brave.",
    "You're even more beautiful on the inside than you are on the outside.",
    "You have the courage of your convictions.",
    "Your eyes are breathtaking.",
    "If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now.",
    "You are making a difference.",
    "You're like sunshine on a rainy day.",
    "You bring out the best in other people.",
    "Your ability to recall random factoids at just the right time is impressive.",
    "You're a great listener.",
    "How is it that you always look great, even in sweatpants?",
    "Everything would be better if more people were like you!",
    "I bet you sweat glitter.",
    "You were cool way before hipsters were cool.",
    "That color is perfect on you.",
    "Hanging out with you is always a blast.",
    "You always know -- and say -- exactly what I need to hear when I need to hear it.",
    "You smell really good.",
    "You may dance like no one's watching, but everyone's watching because you're an amazing dancer!",
    "Being around you makes everything better!",
    "When you say, \"I meant to do that,\" I totally believe you.",
    "When you're not afraid to be yourself is when you're most incredible.",
    "Colors seem brighter when you're around.",
    "You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
    "That thing you don't like about yourself is what makes you so interesting.",
    "You're wonderful.",
    "You have cute elbows. For reals! (You're halfway through the list. Don't stop now! You should be giving at least one awesome compliment every day!)",
    "Jokes are funnier when you tell them.",
    "You're better than a triple-scoop ice cream cone. With sprinkles.",
    "Your bellybutton is kind of adorable.",
    "Your hair looks stunning.",
    "You're one of a kind!",
    "You're inspiring.",
    "If you were a box of crayons, you'd be the giant name-brand one with the built-in sharpener.",
    "You should be thanked more often. So thank you!!",
    "Our community is better because you're in it.",
    "Someone is getting through something hard right now because you've got their back.",
    "You have the best ideas.",
    "You always know how to find that silver lining.",
    "Everyone gets knocked down sometimes, but you always get back up and keep going.",
    "You're a candle in the darkness.",
    "You're a great example to others.",
    "Being around you is like being on a happy little vacation.",
    "You always know just what to say.",
    "You're always learning new things and trying to better yourself, which is awesome.",
    "If someone based an Internet meme on you, it would have impeccable grammar.",
    "You could survive a Zombie apocalypse.",
    "You're more fun than bubble wrap.",
    "When you make a mistake, you fix it.",
    "Who raised you? They deserve a medal for a job well done.",
    "You're great at figuring stuff out.",
    "Your voice is magnificent.",
    "The people you love are lucky to have you in their lives.",
    "You're like a breath of fresh air.",
    "You're gorgeous -- and that's the least interesting thing about you, too.",
    "You're so thoughtful.",
    "Your creative potential seems limitless.",
    "Your name suits you to a T.",
    "You're irresistible when you blush.",
    "Actions speak louder than words, and yours tell an incredible story.",
    "Somehow you make time stop and fly at the same time.",
    "When you make up your mind about something, nothing stands in your way.",
    "You seem to really know who you are.",
    "Any team would be lucky to have you on it.",
    "In high school I bet you were voted \"most likely to keep being awesome.\"",
    "I bet you do the crossword puzzle in ink.",
    "Babies and small animals probably love you.",
    "If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).",
    "There's ordinary, and then there's you.",
    "You're someone's reason to smile.",
    "You're even better than a unicorn, because you're real.",
    "How do you keep being so funny and making everyone laugh?",
    "You have a good head on your shoulders.",
    "Has anyone ever told you that you have great posture?",
    "The way you treasure your loved ones is incredible.",
    "You're really something special.",
    "You're a gift to those around you."
  ]
```

### D. Create a JavaScript file to load our compliments

JSON files can be required and used as plain objects in JavaScript.

```javascript
// Will load the compliments as an array
const compliments = require('./compliments.json');
```

### E. Add logic

Now, to clearly separate our logic, we can move our code to get a compliment into the same file as where we load `compliments.json`.
We call this file  `index.js`. This file will be the our npm package, along with `compliments.json`.

It is important that we remember to export the functions that we want to use in other places.

```javascript
// Will load the compliments as an array
const compliments = require('./compliments.json');

// A simple function that will get a specific compliment in the array
// The first one will have the index 0
function get(index) {
  // Make sure the index is valid, that is inside the array
  if (index < 0 || index > compliments.length - 1) {
    throw new RangeError(
      'The index provided was out of range. Please use a number between 0 and ' + (compliments.length - 1)
    );
  }

  return compliments[index];
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * max);
}

function random() {
  return get(
    getRandomNumber(0, compliments.length-1)
  );
}

// Export the functions for others to use
module.exports = {
  get: get,
  random: random,
};
```

_You could of course use a package from npm to do this. An extra task is to replace the implementation above with [unique-random-array](https://www.npmjs.com/package/unique-random-array) or similar._

### F. Publish your package
We need to begin with logging in to npm. Open your terminal and run `npm login` and enter your credentials as requested.

Now that we are logged in we are able to publish our package.

`npm publish --access public`, and voila - your package is now available!

### G. Install and use your new package in your Slackbot
Go back to your original Slack bot project, and install your newly created compliments module.

```
npm install @<YOUR NPM USERNAME>/compliments --save
```

Now you can `require` your module in your Slack bot directly. Replace your logic for getting a compliment from an array to instead use the compliments module.

```javascript
const { random } = require('@<YOUR NPM USERNAME>/compliments');
```
We can now update the code for our bot to use this random function and remove the now deprecated code to generate a compliment.

```javascript
// We will now get a random compliment from our module
bot.getUserById(user).then(({ name }) => {
  bot.postMessageToUser(name, random());
});
```

## 4. Create a browser version of our package
We will now go through what we need to do if we want to use our package in the browser and not only in Node.js.

### A. Add Webpack to our project
We begin with adding Webpack and `json-loader` to our project that will manage the JavaScript and JSON for us.

```bash
$ npm install webpack json-loader --save-dev
```

### B. Create a minimal Webpack configuration
Create a file with the following content named `webpack.config.js` in the root of the project.
```javascript
const path = require('path');

module.exports = {
  // The file that Webpack should load
  entry: './index.js',

  // Where the output should be placed and named
  output: {
    // The directory to add the built files to, __dirname is the directory that the current file is inside
    path: path.join(__dirname, "umd"),
    // The filename for the built file
    filename: "Compliments.min.js",
    // What the library name should be, will be used in the browser
    library: "Compliments",
    // What type of library we want
    libraryTarget: "umd"
  },
  module: {
    // We need to add a loader to manage .json files
    loaders: [{
      // Regexp that matches files that ends with .json
      test: /\.json$/,
      // The loader we want to use
      loader: 'json-loader'
    }]
  }
};
```

### C. Run Webpack to build our code.
Add a npm script in `package.json` to make it easier to build our project.

```json
...
"scripts": {
  "start": "node index.js",
  "build": "webpack -p"
},
...
```

Using `-p` will tell Webpack that we want to minify the code using UglifyJs.

We can now build our project by running the newly created npm script.

```bash
$ npm run build
```

We will now have a new folder in our project named `umd` where the browser compatible code is.

### D. Use our module in the browser
Let's create a `demo.html` page that will include our created UMD build as a test.

```html
<html>
  <head>
    <title>Netlight Node Workshop</title>
  </head>
  <body>
    <div id="compliment"></div>
    <script src="umd/Compliments.min.js"></script>
    <script>
      document.getElementById('compliment').innerHTML = Compliments.random();
    </script>
  </body>
</html>
```

Now we will have a random compliment each time we reload our browser.

### E. Prepare for publish
We want to make sure we do not add compiled code to git, following best practices. We can do this by adding the `umd` directory to our `.gitignore`.

```git
umd
```

We do however want to publish it to npm and we can use the `files` field in the `package.json` to do this.
```json
...
"files": [
  "index.js",
  "umd"
],
...
```

We can now go ahead and publish our package again.

```bash
$ npm version minor
$ npm publish
```

### F. Replace our local reference with a CDN
If we would like to use this module in a website we might want to use a CDN to do this. A prefect match for us is [npmcdn.com](https://npmcdn.com) since we have published our code to npm.

We can get our UMD bundle at: `https://npmcdn.com/@username/compliments@1.1.0/umd/Compliments.js`
