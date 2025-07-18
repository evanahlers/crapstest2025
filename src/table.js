(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CrapsTable = factory().CrapsTable;
    root.Player = factory().Player;
  }
}(typeof self !== 'undefined' ? self : this, function() {
  class Player {
    constructor(name, transform) {
      this.name = name;
      this.transform = transform || null;
    }
    applyTransform(d1, d2) {
      if (this.transform) {
        const out = this.transform(d1, d2);
        if (Array.isArray(out) && out.length === 2) return out;
      }
      return [d1, d2];
    }
  }

  class CrapsTable {
    constructor(game, seats = 8) {
      this.game = game;
      this.players = [];
      for (let i = 0; i < seats; i++) {
        this.players.push(new Player(`NPC${i + 1}`));
      }
      this.shooterIndex = 0;
    }
    get shooter() {
      return this.players[this.shooterIndex];
    }
    roll() {
      const shooter = this.shooter;
      const orig = this.game.rollDice.bind(this.game);
      this.game.rollDice = () => {
        let [d1, d2, _t] = orig();
        [d1, d2] = shooter.applyTransform(d1, d2);
        return [d1, d2, d1 + d2];
      };
      const result = this.game.playRound();
      this.game.rollDice = orig;
      if (!this.game.point && (result === 'win' || result === 'lose')) {
        this.shooterIndex = (this.shooterIndex + 1) % this.players.length;
      }
      return result;
    }
  }

  return { Player, CrapsTable };
}));
