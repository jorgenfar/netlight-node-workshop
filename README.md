# Netlight Node Workshop

## 1. Create a Slack-bot

### A. Create a new empty project

1. Go to https://github.com. Create a Github account if you don't already have one, and log in. Then go to https://github.com/new.

2. You should see an interface where you can name your project, manage if it should be public or private, and if some files should be added automatically.

  ![GitHub screenshot](http://i.imgur.com/s67O01j.png)

3. You have now set up an empty git project.

> *Git is a version control system that lets you save snapshots of your code, so that you can make changes without having to worry about losing your work, or breaking the program without knowing how you broke it.*

> *These snapshots are referred to as commits.*

> *Online services, like Github, are often used so that you can save your work in the cloud, and cooperate with other developers on a project.*


### B. Add a readme.md
You can write it using the github webpage, or using terminal:

git add README.md
git commit -m "first commit"
git remote add origin git@github.com:<username>/<project>.git
git push -u origin master

A readme.md is like a repository documentation, where you specify how to use this module.

### C. Run `npm init`
Write `npm init` in the terminal. This command interactively creates a package.json file in your project,
letting you specify several options for your new project.

The package.json file will be crucial in your project, as its a manifest of your project metadata, dependencies,
and can be used to specify npm scrips. Is serves as documentation, lets you version your project and makes your project reproducible to others

Remember, node needs to be installed before this will work, as npm follows with node installation.

### D. Install dependencies using npm
Using npm install <package-name> you can install dependencies directly in your project.
Run the command `npm install --save slackbots`. The dependency will now be added to your package.json

Its a smart idea to add a .gitignore file specify that dependencies are not pushed to version management.

You can browse npmjs.org to search for packages, and read documentation and visit github repositories.

What is npm? npm is a package manager that makes it easy for javascript developers to share and reuse code.

### E. Add index.js
The index.js will serve as our entrypoint into our tiny application.
Specify main in package.json as index.js to document how to run your module.

  Write `console.log('Hello World')` in the index.js, and run the command node index.js in terminal.
  You now have your first tiny node application

### F. Read from JSON file
  Copy the file https://github.com/kentcdodds/starwars-names/blob/master/src/starwars-names.json into a new file in your project called starwars.json
  and require it in your index.js by adding `const starwars = require('./starwars');` in the top of your file.
  Change your hello world logging to `console.log(starwars);`, and rerun the command: `node index.js`

  JSON is a format that uses human-readable text to transmit data objects with key value pairs.

  The starwars names are in a list, and if you specify the index (position) of element you want to access in the list, you can write it out directly.
  Try changing the print command to `console.log(starwars[0]);` and rerun your application.

### G. Setup slackbot
  Visit https://netlight-nodeworkshop.slack.com/services/new/bot, and generate integration key.
  Copy these lines into index.js, and change <ADD_TOKEN> with your own token, <NAME_OF_BOT> with a name of your choosing and <ADD_YOUR__USERNAME> with your
  own slack username. Run the `node index.js` command, and see that the bot says hello in general chat. Try to type starwars into a private chat with
  your bot, and see that it responds with a starwars name

```javascript
const starwars = require('./starwars');
const SlackBot = require('slackbots');

function getRandom (max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// create a bot
const bot = new SlackBot({
    token: '<ADD_TOKEN>', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: '<ADD_BOT_NAME>'
});

bot.on('start', function() {
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'Hello!');
});

/**
 * @param {object} data
 */
bot.on('message', function(data) {
    if (data.text === 'starwars') {
      var randomNumber = getRandom(starwars.length - 1, 0);
      bot.postMessageToUser('<YOUR_USERNAME>', starwars[randomNumber]).always(function(data) {
        console.log(data);
      });
    }
});
```
