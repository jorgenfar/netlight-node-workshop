const SlackBot = require('slackbots');

const compliments = require('./compliments');

// create a bot
const bot = new SlackBot({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Complimentbot'
});

bot.on('start', function() {
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'Hello!', { icon_emoji: ':tada:' });
});

bot.on('message', function(data) {
  // We define a pattern the bot is looking for
  // In this case it is looking for messages of the form "[Cc]omplement @username"
  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    // If the message matches the pattern, the user is extracted from the message
    const user = data.text.match(pattern)[1];

    if (user) {
      // The bot gets the user name from the user ID, and attempts to send the user a random complement
      bot.getUserById(user).then(({ name }) => {
        bot.postMessageToUser(name, compliments.random());
      });
    }
  }
});
