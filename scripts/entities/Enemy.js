import k from "../kaboom.js";

import { hp } from "../components.js";

const JUMP_FORCE = 500;

export default function () {
  const obj = k.add([
    k.sprite("goomba", {
      animSpeed: 0.3,
    }),
    k.pos(k.width() - 30, k.height() - 20 * 2),
    k.body(),
    k.solid(),
    k.origin("bot"),
    k.scale(0.2),
    hp(30),
    "enemy",
    "moving",
    {
      damage: 20,
    },
  ]);

  obj.action(() => {
    if (obj.isDead()) {
      k.destroy(obj);
    }

    if (obj.grounded()) {
      obj.jump(JUMP_FORCE);
    }
  });

  obj.play("walk");
}
