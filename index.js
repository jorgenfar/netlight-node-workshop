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
  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    const user = data.text.match(pattern)[1];
    if (user) {
      bot.postMessageToUser(user, compliments.random());
    }
  }
});
