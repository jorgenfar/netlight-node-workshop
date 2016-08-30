const SlackBot = require('slackbots');

// create a bot
const bot = new SlackBot({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Complimentbot'
});

bot.on('start', function() {
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'Hello!', { icon_emoji: ':tada:' });
});

// An array with compliments
const compliments = [
  'You are fantastic!',
  'You are awesome!',
  'Your smile is contagious!',
  'You are an inspiration!'
];

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
          // We are using modulus here
          // It will make sure we never go outside of the array size
          // This will result in the following pattern with our current array 0, 1, 2, 3, 0, 1, 2, 3, 0, ...
          % compliments.length;
      });
    }
  }
});
