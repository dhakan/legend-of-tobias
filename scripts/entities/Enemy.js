import k from "../kaboom.js";

import { hp, stickyHp } from "../components/index.js";

const JUMP_FORCE = 500;
const INITIAL_HEALTH = 30;

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
    hp(INITIAL_HEALTH),
    stickyHp(),
    "enemy",
    "moving",
    {
      damage: 20,
    },
  ]);

  // obj.action(() => {
  //   if (obj.grounded()) {
  //     obj.jump(JUMP_FORCE);
  //   }
  // });

  obj.on("death", () => {
    k.destroy(obj);
  });

  obj.play("walk");

  return obj;
}
