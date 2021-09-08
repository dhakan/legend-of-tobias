import k from "./kaboom.js";

import { createExplosion } from "./entities/index.js";

export default function (player) {
  //   player.collides("key", (key) => {
  //     destroy(key);
  //     player.score += 10;
  //     scoreLabel.text = player.score;
  //     play("kom-igen-da");
  //   });

  player.collides("enemy", (obj) => {
    player.loseHealth(obj.damage);
    // play("hurt");
    k.camShake(12);
  });

  player.collides("hazard", (obj) => {
    player.loseHealth(obj.damage);
    k.camShake(12);
  });

  player.collides("health", (obj) => {
    k.destroy(obj);
    player.gainHealth(obj.value);
  });

  k.collides("projectile", "enemy", (projectile, enemy) => {
    k.destroy(projectile);
    enemy.loseHealth(projectile.damage);

    createExplosion(projectile.pos, 1, 6, 1);
    // play("damage");
  });
}
