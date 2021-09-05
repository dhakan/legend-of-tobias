import musicPlayer from "../musicPlayer.js";

import createPlayer from "../entities/createPlayer.js";
import Key from "../entities/Key.js";
import createSpike from "../entities/createSpike.js";
import createBasePlatform from "../entities/createBasePlatform.js";
import createHealth from "../entities/createHealth.js";
import createEnemy from "../entities/createEnemy.js";
import createBoss from "../entities/createBoss.js";

// Handlers
import createCollisionHandler from "../createCollisionHandler.js";

const LEVEL_SPEED = 100;
const PROJECTILE_SPEED = 300;

export default function () {
  musicPlayer.playSong("theme_level_1");

  gravity(2000);

  add([
    sprite("level_1", {
      width: width(),
      height: height(),
    }),
  ]);

  const player = createPlayer();

  // Collision
  createCollisionHandler(player);

  // Spawn initial platform to land on
  createBasePlatform();

  // Wave 1
  loop(5, async () => {
    createEnemy();
    await wait(1);
    createSpike();
    await wait(1);
    createHealth();
    // createBoss(player, 300);
  });

  // collides("projectile", "enemy", (projectile, enemy) => {
  //   destroy(projectile);
  //   enemy.health -= projectile.damage;

  //   if (enemy.health <= 0) {
  //     destroy(enemy);

  //     if (enemy.is("boss")) {
  //       destroyAll("boss-ui");
  //     }
  //   }

  //   makeExplosion(projectile.pos, 1, 6, 1);
  //   play("damage");

  //   if (enemy.is("boss")) {
  //     enemy.healthbar.width = enemy.health;
  //   }

  //   // For boss enemy
  //   // if (enemy.healthbar)
  // });

  action("moving", (moving) => {
    moving.move(-LEVEL_SPEED, 0);
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
