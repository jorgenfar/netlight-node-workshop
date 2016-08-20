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
      bot.postMessageToUser('<ADD_YOUR_USERNAME>', starwars[randomNumber]).always(function(data) {
        console.log(data);
      });
    }
});
