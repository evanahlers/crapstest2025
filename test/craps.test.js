const assert = require('assert');
const CrapsGame = require('../src/craps');
const { CrapsTable, Player } = require('../src/table');

function testComeOutWin() {
  const game = new CrapsGame();
  game.rollDice = () => [3,4,7];
  const result = game.playRound();
  assert.strictEqual(result, 'win');
  assert.strictEqual(game.balance, 1025); // 1000 -25 +50
}

testComeOutWin();

function testShooterRotation() {
  const game = new CrapsGame();
  const table = new CrapsTable(game, 2);
  // Force shooter 1 to roll 7 to win immediately
  game.rollDice = () => [1,6,7];
  table.roll(); // NPC1 wins, rotation -> NPC2
  assert.strictEqual(table.shooterIndex, 1);
}

testShooterRotation();

function testTransform() {
  const game = new CrapsGame();
  const table = new CrapsTable(game, 1);
  table.players[0] = new Player('Bias', (d1, d2) => [6,6]);
  table.roll();
  const last = game.log[0];
  assert.strictEqual(last.total, 12);
}

testTransform();
console.log('All tests passed');
