const PLAYER_SPEED = 200;
const JUMP_FORCE = 600;
const INITIAL_HEALTH = 100;

export default function () {
  function setHealth(value) {
    obj.health = value;
    healthbar.width = obj.health;
  }

  function loseHealth(by) {
    setHealth(obj.health - by);
  }

  function gainHealth(by) {
    setHealth(obj.health + by);
  }

  function resetHealth() {
    setHealth(INITIAL_HEALTH);
  }

  const obj = add([
    sprite("tobias", {
      animSpeed: 0.2,
    }),
    pos(width() / 2, height() / 2),
    origin("bot"),
    body(),
    "player",
    { health: 100, score: 0, loseHealth, gainHealth, resetHealth },
  ]);

  const healthbar = add([
    rect(obj.health, 20),
    pos(20 + 50, 20),
    color(1, 0, 0),
    layer("ui"),
  ]);

  const hpLabel = add([text("HP", 20), pos(20), layer("ui")]);

  obj.action(() => {
    if (obj.pos.x - obj.width / 2 <= 0) {
      obj.pos.x = 0 + obj.width / 2;
    }

    if (obj.pos.x + obj.width / 2 >= width()) {
      obj.pos.x = width() - obj.width / 2;
    }

    if (obj.pos.y >= height() + 24) {
      go("gameover", obj.score);
    }

    if (obj.health <= 0) {
      go("gameover", obj.score);
      play("death");
    }
  });

  obj.on("grounded", () => {
    if (keyIsDown("left") || keyIsDown("right")) {
      obj.play("run");
    } else {
      obj.play("idle");
    }
  });

  keyDown("left", () => {
    obj.move(-PLAYER_SPEED, 0);
  });

  keyDown("right", () => {
    obj.move(PLAYER_SPEED, 0);
  });

  keyPress("space", () => {
    if (!obj.grounded()) {
      return;
    }
    obj.jump(JUMP_FORCE);
    obj.play("jump");

    play(`ey1`);
  });

  keyPress("left", () => {
    if (obj.grounded()) {
      obj.play("run");
    }
  });

  keyPress("right", () => {
    if (obj.grounded()) {
      obj.play("run");
    }
  });

  keyPress("f", () => {
    add([
      sprite("balck"),
      pos(obj.pos.x + obj.width, obj.pos.y - obj.height / 2),
      origin("right"),
      scale(0.2),
      "projectile",
      {
        damage: 10,
      },
    ]);
  });

  keyRelease(["left", "right"], () => {
    if (obj.grounded()) {
      obj.play("idle");
    }
  });

  obj.play("idle");

  return obj;
}
