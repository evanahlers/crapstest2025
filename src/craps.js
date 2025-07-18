// Simple craps engine for local testing
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CrapsGame = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  class CrapsGame {
  constructor() {
    this.point = null; // null when off
    this.log = [];
    this.balance = 1000; // starting bankroll
  }

  rollDice() {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    return [d1, d2, d1 + d2];
  }

  playRound(betPass = 25) {
    if (this.balance < betPass) return 'Bankroll too low';
    this.balance -= betPass;
    const [d1, d2, total] = this.rollDice();
    let result;
    if (!this.point) {
      // come out roll
      if (total === 7 || total === 11) {
        this.balance += betPass * 2;
        result = 'win';
      } else if (total === 2 || total === 3 || total === 12) {
        result = 'lose';
      } else {
        this.point = total;
        result = 'point established';
      }
    } else {
      // point is on
      if (total === this.point) {
        this.balance += betPass * 2;
        result = 'win';
        this.point = null;
      } else if (total === 7) {
        result = 'lose';
        this.point = null;
      } else {
        result = 'roll again';
      }
    }
    this.log.push({d1,d2,total,result,balance:this.balance,point:this.point});
    return result;
  }
  }
  return CrapsGame;
}));
