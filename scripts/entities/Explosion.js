import k from "../kaboom.js";

import { lifespan, grow } from "../components.js";

// Borrowed solution from kaboomjs.com
export default function (p, n, rad, size) {
  for (let i = 0; i < n; i++) {
    k.wait(k.rand(n * 0.1), () => {
      for (let i = 0; i < 2; i++) {
        k.add([
          k.pos(p.add(k.rand(k.vec2(-rad), k.vec2(rad)))),
          k.rect(1, 1),
          k.scale(1 * size, 1 * size),
          lifespan(0.2),
          grow(k.rand(48, 72) * size),
          k.origin("center"),
        ]);
      }
    });
  }
}
