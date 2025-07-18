const CrapsGame = require('./craps');
const { CrapsTable } = require('./table');

const game = new CrapsGame();
const table = new CrapsTable(game);
console.log('Starting balance $' + game.balance);
let rounds = parseInt(process.argv[2] || '10', 10);
for (let i=0; i<rounds; i++) {
  const result = table.roll();
  const log = game.log[game.log.length -1];
  console.log(`Shooter NPC${table.shooterIndex+1} roll ${i+1}: ${log.d1}+${log.d2}=${log.total} -> ${result}, balance $${game.balance}`);
}
