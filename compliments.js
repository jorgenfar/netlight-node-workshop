const complimentsJson = require('./compliments.json');

function getCompliment() {
  const { compliments } = complimentsJson;
  return compliments[Math.floor(Math.random()*compliments.length)];
}

module.exports = {
  getCompliment,
};
