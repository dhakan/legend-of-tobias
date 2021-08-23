import musicPlayer from "../musicPlayer.js";

import Player from "../entities/Player.js";
import Key from "../entities/Key.js";
import Spike from "../entities/Spike.js";
import BasePlatform from "../entities/BasePlatform.js";
import Enemy from "../entities/Enemy.js";
import Health from "../entities/Health.js";
import Boss from "../entities/Boss.js";

export default function () {
  const LEVEL_SPEED = 100;
  const PROJECTILE_SPEED = 300;
  const JUMP_FORCE = 800;

  function makeExplosion(p, n, rad, size) {
    for (let i = 0; i < n; i++) {
      wait(rand(n * 0.1), () => {
        for (let i = 0; i < 2; i++) {
          add([
            pos(p.add(rand(vec2(-rad), vec2(rad)))),
            rect(1, 1),
            scale(1 * size, 1 * size),
            lifespan(0.2),
            grow(rand(48, 72) * size),
            origin("center"),
          ]);
        }
      });
    }
  }

  function lifespan(time) {
    let timer = 0;
    return {
      update() {
        timer += dt();
        if (timer >= time) {
          destroy(this);
        }
      },
    };
  }

  function grow(rate) {
    return {
      update() {
        const n = rate * dt();
        this.scale.x += n;
        this.scale.y += n;
      },
    };
  }

  // musicPlayer.playSong("theme_level_1");

  gravity(2000);

  add([
    sprite("level_1", {
      width: width(),
      height: height(),
    }),
  ]);

  const player = Player();

  const hpLabel = add([text("HP", 20), pos(20), layer("ui")]);

  const healthbar = add([
    rect(player.health, 20),
    pos(20 + 50, 20),
    color(1, 0, 0),
    layer("ui"),
  ]);

  // const scoreLabel = add([text(player.score, 32), pos(12, 12), layer("ui")]);

  player.play("idle");

  // Spawn initial platform to land on
  BasePlatform();

  wait(3, () => {
    Boss();
  })

  // loop(3, () => {
  //   Key();
  // });

  // loop(3, () => {
  //   Spike();
  // });

  // loop(3, () => {
  //   Enemy();
  // });

  // loop(10, () => {
  //   Health();
  // });

  player.collides("key", (key) => {
    destroy(key);
    player.score += 10;
    scoreLabel.text = player.score;
    play("kom-igen-da");
  });

  player.collides("spike", () => {
    player.health -= 20;
    healthbar.width = player.health;
    play("hurt");
    camShake(12);
  });

  player.collides("enemy", () => {
    player.health -= 20;
    healthbar.width = player.health;
    play("hurt");
    camShake(12);
  });

  player.collides("health", (obj) => {
    destroy(obj);
    player.health += obj.value;

    if (player.health > 100) {
      player.health = 100;
    }

    healthbar.width = player.health;
    play("collected");
  });

  collides("projectile", "enemy", (projectile, enemy) => {
    destroy(projectile);
    enemy.health -= projectile.damage;

    if (enemy.health <= 0) {
      destroy(enemy);

      if (enemy.is("boss")) {
        destroyAll("boss-ui");
      }
    }

    makeExplosion(projectile.pos, 1, 6, 1);
    play("damage");

    if (enemy.is("boss")) {
      enemy.healthbar.width = enemy.health;
    }

    // For boss enemy
    // if (enemy.healthbar)
  });

  action("moving", (moving) => {
    moving.move(-LEVEL_SPEED, 0);
  });

  action("jumping", (jumping) => {
    if (!jumping.grounded()) {
      return;
    }

    jumping.jump(JUMP_FORCE);
  });

  action("projectile", (projectile) => {
    projectile.move(PROJECTILE_SPEED, 0);

    if (projectile.pos.x >= width() + projectile.width) {
      projectile.destroy();
    }
  });

  //   Fix this
  keyPress("m", () => {
    musicPlayer.toggleMute();
  });
}
