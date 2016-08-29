const compliments = require('./compliments.json');

function get(index) {
  if (index < 0 || index > compliments.length -1) {
    throw new RangeError('Bad index provided to get()');
  }
  return compliments[index];
}

function random(min, max) {
  return min + Math.floor(Math.random() * max);
}

function getRandom() {
  return get(random(0, compliments.length-1));
}

module.exports = {
  get: get,
  getRandom: getRandom,
};
