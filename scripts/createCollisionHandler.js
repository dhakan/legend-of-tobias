import createExplosion from "./entities/createExplosion.js";

export default function (player) {
  //   player.collides("key", (key) => {
  //     destroy(key);
  //     player.score += 10;
  //     scoreLabel.text = player.score;
  //     play("kom-igen-da");
  //   });

  player.collides("enemy", (obj) => {
    player.loseHealth(obj.damage);
    play("hurt");
    camShake(12);
  });

  player.collides("health", (obj) => {
    destroy(obj);
    player.gainHealth(obj.value);

    if (player.health > 100) {
      player.resetHealth();
    }

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

    createExplosion(projectile.pos, 1, 6, 1);
    play("damage");

    if (enemy.is("boss")) {
      enemy.healthbar.width = enemy.health;
    }
  });
}
