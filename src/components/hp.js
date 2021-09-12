export default function (initialHealth) {
  let health = initialHealth;

  return {
    id: "hp",
    _setHealth(value) {
      health = value;
    },
    resetHealth() {
      health = initialHealth;
    },
    getHealth() {
      return health;
    },
    getInitialHealth() {
      return initialHealth;
    },
    loseHealth(by) {
      this._setHealth(health - by);

      if (health <= 0) {
        this.trigger("death");
      } else {
        this.trigger("hurt");
      }
    },
    gainHealth(by) {
      this._setHealth(health + by);

      if (health > 100) {
        this.resetHealth();
      }

      this.trigger("health");
    },
  };
}
