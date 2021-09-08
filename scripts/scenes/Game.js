import k from "../kaboom.js";

import musicPlayer from "../musicPlayer.js";

// Entities
import {
  createBasePlatform,
  createPlayer,
  createSpike,
  createHealth,
  createEnemy,
  createBoss,
} from "../entities/index.js";

// Handlers
import createCollisionHandler from "../createCollisionHandler.js";

const LEVEL_SPEED = 100;
const PROJECTILE_SPEED = 300;

const ENEMY_JUMP_FORCE = 500;

export default function () {
  musicPlayer.playSong("theme_level_1");

  k.gravity(2000);

  k.add([
    k.sprite("level_1", {
      width: k.width(),
      height: k.height(),
    }),
  ]);

  const player = createPlayer();

  // Collision
  createCollisionHandler(player);

  // Spawn initial platform to land on
  createBasePlatform();

  // Wave 1
  k.wait(2, async () => {
    createEnemy();
    await k.wait(2);
    createEnemy();
    await k.wait(2);
    createEnemy();
    await k.wait(2);
    createEnemy();
    await k.wait(2);
    createEnemy();

    await k.wait(3);

    createEnemy(["jumping"]);
    await k.wait(2);
    createEnemy(["jumping"]);
    await k.wait(2);
    createEnemy(["jumping"]);
    await k.wait(2);
    createEnemy(["jumping"]);
    await k.wait(2);
    createEnemy(["jumping"]);

    await k.wait(2);

    const bossText = k.add([
      k.text("BOSS 1 - CARMELITAS", 20),
      k.pos(k.width(), k.height() / 2),
      k.origin("left"),
    ]);

    bossText.action(async () => {
      if (bossText.pos.x + bossText.width / 2 > k.width() / 2) {
        bossText.move(-250, 0);
        return;
      }

      await k.wait(2);
      k.destroy(bossText);
    });

    bossText.on("destroy", () => {
      createBoss(player);
    });
  });

  k.action("moving", (obj) => {
    obj.move(-LEVEL_SPEED, 0);
  });

  k.action("jumping", (obj) => {
    if (!obj.grounded()) {
      return;
    }
    obj.jump(ENEMY_JUMP_FORCE);
  });

  k.action("projectile", (projectile) => {
    projectile.move(PROJECTILE_SPEED, 0);

    if (projectile.pos.x >= k.width() + projectile.width) {
      projectile.destroy();
    }
  });
}
