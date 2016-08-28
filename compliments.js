const compliments = require('./compliments.json');

function random() {
  return compliments[Math.floor(Math.random()*compliments.length)];
}

module.exports = {
  random: random
};
