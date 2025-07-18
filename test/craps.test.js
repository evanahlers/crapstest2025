const assert = require('assert');
const CrapsGame = require('../src/craps');

function testComeOutWin() {
  const game = new CrapsGame();
  // Force dice to 7
  game.rollDice = () => [3,4,7];
  const result = game.playRound();
  assert.strictEqual(result, 'win');
  assert.strictEqual(game.balance, 1025); // 1000 -25 +50
}

testComeOutWin();
console.log('All tests passed');
