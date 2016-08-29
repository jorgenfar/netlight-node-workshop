const SlackBot = require('slackbots');

const starwars = require('./starwars');
const compliments = require('./compliments');

function getRandom (max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// create a bot
const bot = new SlackBot({
    token: process.env.SLACK_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Complimentbot'
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
      bot.postMessageToUser('<ADD_YOUR_USERNAME>', starwars[randomNumber]).always(function(data) {
        console.log(data);
      });
    }
});

bot.on('message', function(data) {
  const pattern = /[Cc]ompliment <@(\w+)>/
  if (data.text && data.text.match(pattern)) {
    const user = data.text.match(pattern)[1];
    if (user) {
      bot.postMessage(user, compliments.getCompliment());
    }
  }
});
