const PLAYER_SPEED = 200;
const JUMP_FORCE = 600;

export default function () {
  const player = add([
    sprite("tobias", {
      animSpeed: 0.2,
    }),
    pos(width() / 2, height() / 2),
    origin("bot"),
    body(),
    { health: 100, score: 0 },
  ]);

  player.action(() => {
    if (player.pos.x - player.width / 2 <= 0) {
      player.pos.x = 0 + player.width / 2;
    }

    if (player.pos.x + player.width / 2 >= width()) {
      player.pos.x = width() - player.width / 2;
    }

    if (player.pos.y >= height() + 24) {
      go("gameover", player.score);
    }

    if (player.health <= 0) {
      go("gameover", player.score);
    }
  });

  player.on("grounded", () => {
    if (keyIsDown("left") || keyIsDown("right")) {
      player.play("run");
    } else {
      player.play("idle");
    }
  });

  keyDown("left", () => {
    player.move(-PLAYER_SPEED, 0);
  });

  keyDown("right", () => {
    player.move(PLAYER_SPEED, 0);
  });

  keyPress("space", () => {
    if (!player.grounded()) {
      return;
    }
    player.jump(JUMP_FORCE);
    player.play("jump");

    play(`ey1`);
  });

  keyPress("left", () => {
    if (player.grounded()) {
      player.play("run");
    }
  });

  keyPress("right", () => {
    if (player.grounded()) {
      player.play("run");
    }
  });

  keyPress("f", () => {
    add([
      sprite("balck"),
      pos(player.pos.x + player.width, player.pos.y - player.height / 2),
      origin("right"),
      scale(0.2),
      "projectile",
      {
        damage: 10,
      },
    ]);
  });

  keyRelease(["left", "right"], () => {
    if (player.grounded()) {
      player.play("idle");
    }
  });

  return player;
}
