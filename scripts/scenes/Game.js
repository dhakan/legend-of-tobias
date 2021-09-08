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
  // k.loop(5, async () => {
  //   createEnemy();
  //   await k.wait(1);
  //   createSpike();
  //   await k.wait(1);
  //   createHealth();
  // });

  createBoss(player);

  k.action("moving", (moving) => {
    moving.move(-LEVEL_SPEED, 0);
  });

  k.action("projectile", (projectile) => {
    projectile.move(PROJECTILE_SPEED, 0);

    if (projectile.pos.x >= k.width() + projectile.width) {
      projectile.destroy();
    }
  });
}
