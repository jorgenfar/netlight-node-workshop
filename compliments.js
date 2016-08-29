const compliments = require('./compliments.json');

function random(min, max) {
  return min + Math.floor(Math.random() * max)];
}

function get(index) {
  if (index < 0 || index > compliments.length -1) {
    throw new Error('Bad index provided to get()');
  }
  return compliments[random(0, compliments.length-1)];
}

module.exports = {
  random: random
};
