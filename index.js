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

const compliments = [
  'You are fantastic!',
  'You are awesome!',
  'Your smile is contagious!',
  'You are an inspiration!'
];

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
        bot.postMessageToUser(name, random());
      });
    }
  }
});
