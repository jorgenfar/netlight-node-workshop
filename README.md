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
- giving complements to other users
- matching consultants that want to eat lunch with each other
- give information about the weather

See the entire API that `slackbots` provides [here](https://github.com/mishk0/slack-bot-api).

## 2. Run the our bot in the cloud

## 3. Creating a npm package

## 4. Create a browser version of our package
