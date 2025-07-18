const CrapsGame = require('./craps');
const game = new CrapsGame();
console.log('Starting balance $' + game.balance);
let rounds = parseInt(process.argv[2] || '10', 10);
for (let i=0; i<rounds; i++) {
  const result = game.playRound();
  const log = game.log[game.log.length -1];
  console.log(`Roll ${i+1}: ${log.d1}+${log.d2}=${log.total} -> ${result}, balance $${game.balance}`);
}
