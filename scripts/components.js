import k from "./kaboom.js";

// Borrowed solution from kaboomjs.com
function lifespan(time) {
  let timer = 0;
  return {
    update() {
      timer += k.dt();
      if (timer >= time) {
        k.destroy(this);
      }
    },
  };
}

// Borrowed solution from kaboomjs.com
function grow(rate) {
  return {
    update() {
      const n = rate * k.dt();
      this.scale.x += n;
      this.scale.y += n;
    },
  };
}

function hp(initialHealth, includeUi = false, destroyable) {
  function updateUi() {
    if (includeUi) {
      ui.width = health;
    }
  }

  function removeUi() {
    if (includeUi) {
      k.destroy(ui);
      k.destroy(uiLabel);
    }
  }

  let health = initialHealth;
  let ui = null;
  let uiLabel = null;

  if (includeUi) {
    uiLabel = k.add([k.text("HP", 20), k.pos(20), k.layer("ui")]);

    ui = k.add([
      k.rect(initialHealth, 20),
      k.pos(20 + 50, 20),
      k.color(1, 0, 0),
      k.layer("ui"),
    ]);
  }

  return {
    update() {
      updateUi();
    },
    getHealth() {
      return health;
    },
    setHealth(value) {
      health = value;

      if (includeUi) {
        ui.width = health;
      }

      if (this.isDead()) {
        removeUi();
      }

      if (health > 100) {
        this.resetHealth();
        // play("collected");
      }
    },
    loseHealth(by) {
      this.setHealth(health - by);
    },
    gainHealth(by) {
      this.setHealth(health + by);
    },
    resetHealth() {
      health = initialHealth;
    },
    isDead() {
      return health <= 0;
    },
  };
}

export { lifespan, grow, hp };
