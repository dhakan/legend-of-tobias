import k from "../kaboom.js";

import { hp } from "../components.js";

const PLAYER_SPEED = 200;
const JUMP_FORCE = 600;
const INITIAL_HEALTH = 100;

export default function () {
  const obj = k.add([
    k.sprite("tobias", {
      animSpeed: 0.2,
    }),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("bot"),
    k.body(),
    k.scale(1),
    hp(INITIAL_HEALTH, true),
    "player",
    { score: 0 },
  ]);

  obj.action(() => {
    if (obj.pos.x - obj.width / 2 <= 0) {
      obj.pos.x = 0 + obj.width / 2;
    }

    if (obj.pos.x + obj.width / 2 >= k.width()) {
      obj.pos.x = k.width() - obj.width / 2;
    }

    if (obj.pos.y >= k.height() + 24) {
      k.go("gameover", obj.score);
    }

    if (obj.isDead()) {
      k.go("gameover", 0);
    }
  });

  obj.on("grounded", () => {
    if (k.keyIsDown("left") || k.keyIsDown("right")) {
      obj.play("run");
    } else {
      obj.play("idle");
    }
  });

  k.keyDown("left", () => {
    obj.scale.x = -1;
    obj.move(-PLAYER_SPEED, 0);
  });

  k.keyDown("right", () => {
    obj.scale.x = 1;
    obj.move(PLAYER_SPEED, 0);
  });

  k.keyPress("space", () => {
    if (!obj.grounded()) {
      return;
    }
    obj.jump(JUMP_FORCE);
    obj.play("jump");

    // play(`ey1`);
  });

  k.keyPress("left", () => {
    if (obj.grounded()) {
      obj.play("run");
    }
  });

  k.keyPress("right", () => {
    if (obj.grounded()) {
      obj.play("run");
    }
  });

  k.keyPress("f", () => {
    k.add([
      k.sprite("balck"),
      k.pos(obj.pos.x + obj.width, obj.pos.y - obj.height / 2),
      k.origin("right"),
      k.scale(0.2),
      "projectile",
      {
        damage: 10,
      },
    ]);
  });

  k.keyRelease(["left", "right"], () => {
    if (obj.grounded()) {
      obj.scale.x = 1;
      obj.play("idle");
    }
  });

  obj.play("idle");

  return obj;
}
