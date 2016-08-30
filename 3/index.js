// Will load the compliments as an array
const compliments = require('./compliments.json');

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

// Export the functions for others to use
module.exports = {
  get: get,
  random: random,
};
