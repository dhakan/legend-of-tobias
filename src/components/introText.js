import k from "../kaboom.js";

import { createShadowText } from "../entities/index.js";

const SPEED = 250;

export default function (value, timer) {
  const obj = createShadowText(value, 22);

  let animationComplete = false;

  return {
    update() {
      timer -= k.dt();

      if (obj.pos.x + obj.width / 2 > k.width() / 2) {
        obj.move(-SPEED, 0);
        return;
      }

      if (timer <= 0 && !animationComplete) {
        animationComplete = true;
        k.destroy(obj);
        this.trigger("intro-complete");
      }
    },
  };
}
